import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { Grid,Container, Typography, Button, IconButton, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import { UserProfileRequest } from '../../../_view_model/user-information'
import { RoleType } from '../../../_enum/role-type'
import { DocumentRequest } from '../../../_view_model/document'
import {getBase64} from './../../util/file-helper'
import DeleteIcon from '@material-ui/icons/Delete'
import { SkillViewModel } from '../../../_view_model/skill';
import { useDispatch } from 'react-redux';
import {registerNewUser} from './../../../_setup/actions/account-actions'


const PROFILE_ID = 'profileImg'
const OTHER_DOCS_ID = 'otherDocs'

export default function RegistrationForm() {
    const initialState:UserProfileRequest ={
        firstName:'',
        phoneNumber: '',
        password:'',
        lastName: '',
        birthDate:'',
        email: '',
        role: RoleType.EMPLOYEE,
        bio: '',
        availablityInfo: {
            id:0,
            isAvailable:true,
            explanation:''
        },
        skills: [],
        portfolio: {
            id:0,
            employeeId:'',
            projects:[]
        },
        employementHistory: [],
        educationHistory: [],
        profilePicture: {
            id:undefined,
            mimeType:'',
            fileName:'',
            file:''
        },
        otherDocs: []
    }
    const [userData, setUserData] = useState(initialState)
    const dispatch = useDispatch()
    
    const submitData = ()=>{
        dispatch(registerNewUser(userData))
    }



    async function handleFileChange(tagId:string){
        let file = (document.getElementById(tagId) as HTMLInputElement).files;
          if(file!=null)
          {
              let base64 = await getBase64(file[0] as Blob); 
              let doc: DocumentRequest =  {
                  mimeType: file[0].type,
                  fileName: file[0].name,
                  file: base64,
              }
              tagId === PROFILE_ID 
              ?
              setUserData({...userData,profilePicture:doc})
              :
              setUserData({...userData,otherDocs:[...userData.otherDocs,doc]})
              file = null
          }
      }
  
      function fileRow(value:DocumentRequest , key:number){
        return (
          <Grid style={{
                    padding:"5px",
                    marginBottom:"5px",
                    border:"1px solid lightgray" 
                }}
                container 
                key={key} 
                justify="center">
             <Grid item xs={11} >
                <p style={{paddingTop:"10px"}}>{value.fileName}</p> 
             </Grid>
             <Grid item xs={1}>
                <IconButton  onClick={()=>
                    {
                        let temp = userData.otherDocs
                        temp.splice(key,1)
                        setUserData({...userData,otherDocs:temp})
                    }}>
                   <DeleteIcon color={'error'}/>
                </IconButton>
             </Grid>
          </Grid>
        )
      }

      function profilePicture(value:DocumentRequest){
        return (
          <Grid style={{
                    padding:"5px",
                    marginBottom:"5px",
                    border:"1px solid lightgray" 
                }}
                container 
                justify="center">
             <Grid item xs={11} >
                <p style={{paddingTop:"10px"}}>{value.fileName}</p> 
             </Grid>
             <Grid item xs={1}>
                <IconButton  onClick={()=>
                    {
                        setUserData({...userData,profilePicture:
                            {
                                id:undefined,
                                mimeType:'',
                                fileName:'',
                                file:''
                            }})
                    }}>
                   <DeleteIcon color={'error'}/>
                </IconButton>
             </Grid>
          </Grid>
        )
      }

      function skillRow(value:SkillViewModel , key:number){
        return (
          <Grid style={{
                    padding:"5px",
                    marginBottom:"5px",
                    border:"1px solid lightgray" 
                }}
                container 
                key={key} 
                justify="center">
             <Grid item xs={11} >
                <p style={{paddingTop:"10px"}}>{value.name}</p> 
                <p style={{paddingTop:"10px"}}>{value.description}</p> 
             </Grid>
             <Grid item xs={1}>
                <IconButton  onClick={()=>
                    {
                        let temp = userData.skills
                        temp.splice(key,1)
                        setUserData({...userData,skills:temp})
                    }}>
                   <DeleteIcon color={'error'}/>
                </IconButton>
             </Grid>
          </Grid>
        )
      }

    return (
        <div>
            <Container component={'main'} maxWidth={'md'}> 
            <Typography component="h1" variant="h5">
            Register Here
            </Typography>
                <Grid container justify={'center'}>
                    <Grid item xs={12}>
                        <Grid container spacing={2} justify={'flex-start'}>
                        <Grid item md={6} xs={6}>
                            <TextField
                                required
                                fullWidth
                                label="Firstname"
                                name="firstname"
                                onChange={(event)=>setUserData({...userData,firstName:event.target.value})}
                            />
                        </Grid>
                        <Grid item md={6} xs={6}>
                            <TextField
                                required
                                fullWidth
                                label="Lastname"
                                name="lastname"
                                onChange={(event)=>setUserData({...userData,lastName:event.target.value})}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Email"
                                name="email"
                                onChange={(event)=>setUserData({...userData,email:event.target.value})}
                            />
                        </Grid>
                        
                        <Grid item md={12} xs={12}>
                            <TextField
                                required
                                fullWidth
                                type={'password'}
                                label="Password"
                                value={userData.password}
                                name="phoneNumber"
                                onChange={(event)=>setUserData({...userData,password:event.target.value})}
                            />
                        </Grid>

                        <Grid item md={12} xs={12}>
                            <TextField
                                required
                                fullWidth
                                type={'password'}
                                value={userData.password}
                                label="Re-password"
                                name="phoneNumber"
                                onChange={(event)=>setUserData({...userData,password:event.target.value})}
                            />
                        </Grid>

                        <Grid item md={12} xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Phone Number"
                                name="phoneNumber"
                                onChange={(event)=>setUserData({...userData,phoneNumber:event.target.value})}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <TextField
                                required
                                label="Birthdate"
                                defaultValue="2017-05-24"
                                fullWidth
                                id={'date'}
                                type={'date'}
                                name="birthDate"
                                onChange={(event)=>setUserData({...userData,birthDate:event.target.value})}
                            />
                        </Grid>

                            
                        <Typography >Select Your Role</Typography>
                                    
                        <Grid item md={12} xs={12}>
                            <RadioGroup
                                aria-label={'Role'}
                                value={userData.role+''}
                                onChange={ (event: any)=>{
                                    setUserData({...userData,role:event.target.value})
                                } }
                                row
                                >
                                    <FormControlLabel  value={RoleType.EMPLOYEE + ''} control={<Radio color="primary"/>} label={'Employee'} />
                                    <FormControlLabel value={RoleType.EMPLOYER +''} control={<Radio color="primary"/>} label={'Employer'} />
                                </RadioGroup>
                        </Grid>
                       

                        <Grid item md={12} xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={5}
                                label="Bio"
                                name="bio"
                                onChange={(event)=>setUserData({...userData,bio:event.target.value})}
                            />
                        </Grid>
                        {
                            userData.profilePicture.fileName.trim().length>0 &&
                            profilePicture(userData.profilePicture)  
                        }
                        <Grid item xs={12}>
                            <input id={PROFILE_ID} type="file" onChange={()=>handleFileChange(PROFILE_ID)}/>
                        </Grid>

                        {
                            userData.otherDocs.map(fileRow)  
                        }
                        <Grid item xs={12}>
                            <input id={OTHER_DOCS_ID} type="file" onChange={()=>handleFileChange(OTHER_DOCS_ID)}/>
                        </Grid>

                        {
                            userData.skills.map(skillRow)
                        }
                        <Grid item md={4} xs={12}>
                            <Button style={{borderRadius:'2px'}} onClick={submitData} fullWidth variant={'outlined'}>
                                Add Skill
                            </Button>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Button style={{borderRadius:'2px'}} onClick={submitData} fullWidth variant={'outlined'}>
                                Add Employment
                            </Button>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Button style={{borderRadius:'2px'}} onClick={submitData} fullWidth variant={'outlined'}>
                                Add Education
                            </Button>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Button color='primary' style={{borderRadius:'2px'}} onClick={submitData} fullWidth variant={'outlined'}>
                                submit
                            </Button>
                        </Grid>
                        
                        
                    </Grid>
                    </Grid>
                    </Grid>
                </Container>
        </div>
    )
}
