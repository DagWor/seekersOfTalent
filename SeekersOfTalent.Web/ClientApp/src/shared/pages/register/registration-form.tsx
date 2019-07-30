import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import {Button, Container, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Typography} from '@material-ui/core'
import {UserProfileRequest, UserProfileResponse} from '../../../_view_model/user-information'
import {RoleType} from '../../../_enum/role-type'
import {DocumentRequest} from '../../../_view_model/document'
import {getBase64} from './../../util/file-helper'
import DeleteIcon from '@material-ui/icons/Delete'
import {useDispatch, useSelector} from 'react-redux';
import {registerNewUser} from './../../../_setup/actions/account-actions'
import convertResponseToRequest, {defaultRequestValue} from './../../util/model-converter'
import TabFormFields from './tab-form'
import {ApplicationState} from "../../../_state_model/application-state";

const PROFILE_ID = 'profileImg'
const OTHER_DOCS_ID = 'otherDocs'

interface IProps{
    editData? : UserProfileResponse
}

export default function RegistrationForm(props: IProps) {
    const initialState:UserProfileRequest = (props.editData != undefined) ? convertResponseToRequest(props.editData) : defaultRequestValue
    const [userData, setUserData] = useState(initialState)
    const [rePwd,setRePwd] = useState('')

    const authState = useSelector((appState:ApplicationState)=>appState.auth )
    const dispatch = useDispatch()
    
    const submitData = ()=>{
        console.log('Final User Data : ',userData)
        if(userData.password === rePwd)
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



    return (
        <div>
            <Container component={'main'} maxWidth={'md'}> 
                <Grid container justify={'flex-start'}>
                    <Grid item xs={12}>
                        <Grid container spacing={2} justify={'flex-start'}>
                        <Grid item md={6}>
                            <TextField
                                required
                                fullWidth
                                label="Firstname"
                                name="firstname"
                                value={userData.firstName}
                                onChange={(event)=>setUserData({...userData,firstName:event.target.value})}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                required
                                fullWidth
                                label="Lastname"
                                name="lastname"
                                value={userData.lastName}
                                onChange={(event)=>setUserData({...userData,lastName:event.target.value})}
                            />
                        </Grid>
                        <Grid item md={12}>
                            <TextField
                                required
                                fullWidth
                                label="Email"
                                name="email"
                                value={userData.email}
                                onChange={(event)=>setUserData({...userData,email:event.target.value})}
                            />
                        </Grid>
                            {
                                !authState.authenticated &&
                                <Grid item md={12}>
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
                            }
                            {
                                !authState.authenticated &&
                                <Grid item md={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        type={'password'}
                                        value={rePwd}
                                        label="Re-password"
                                        onChange={(event)=>setRePwd(event.target.value)}
                                    />
                                </Grid>
                            }
                        <Grid item md={12}>
                            <TextField
                                required
                                fullWidth
                                label="Phone Number"
                                name="phoneNumber"
                                value={userData.phoneNumber}
                                onChange={(event)=>setUserData({...userData,phoneNumber:event.target.value})}
                            />
                        </Grid>
                        <Grid item md={12}>
                            <TextField
                                required
                                defaultValue="2017-05-24"
                                fullWidth
                                id={'date'}
                                type={'date'}
                                value={userData.birthDate}
                                name="birthDate"
                                onChange={(event)=>setUserData({...userData,birthDate:event.target.value})}
                            />
                        </Grid>

                            {
                                !authState.authenticated &&
                        <Grid item md={12}>
                            <RadioGroup
                                        aria-label={'Role'}
                                        value={userData.role+''}
                                        onChange={ (event: any)=>{
                                            setUserData({...userData,role:event.target.value})
                                        } }
                                        row
                                        >
                                        <Typography style={{padding:'15px 15px 15px 0px'}} >Select Your Role</Typography>
                                        <FormControlLabel  value={RoleType.EMPLOYEE + ''} control={<Radio color="primary"/>} label={'Employee'} />
                                        <FormControlLabel value={RoleType.EMPLOYER +''} control={<Radio color="primary"/>} label={'Employer'} />
                                </RadioGroup>
                        </Grid>
                       }

                       <div style={{height: userData.role == RoleType.EMPLOYEE? 'auto' : '0px',width:'100%',overflow:'hidden'}}>
                        <Grid item md={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={5}
                                label="Bio"
                                name="bio"
                                value={userData.bio}
                                onChange={(event)=>setUserData({...userData,bio:event.target.value})}
                            />
                        </Grid>
                        {
                            userData.profilePicture.fileName.trim().length>0 &&
                            profilePicture(userData.profilePicture)  
                        }
                            <Grid item xs={12}>
                             <input id={PROFILE_ID} type="file" style={{visibility:'hidden'}} onChange={()=>handleFileChange(PROFILE_ID)}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Button style={{borderRadius:'2px'}} onClick={()=>{
                                    let prflInput = (document.getElementById(PROFILE_ID) as HTMLInputElement);
                                    prflInput.click()
                                }} color={'primary'} variant={'outlined'}>
                                    Add Profile Image
                                </Button>
                            </Grid>
                        {
                            userData.otherDocs.map(fileRow)  
                        }
                            <input style={{visibility:'hidden'}} id={OTHER_DOCS_ID} type="file" onChange={()=>handleFileChange(OTHER_DOCS_ID)}/>
                            <Grid item xs={12}>
                                <Button style={{borderRadius:'2px'}} onClick={()=>{
                                    let prflInput = (document.getElementById(OTHER_DOCS_ID) as HTMLInputElement);
                                    prflInput.click()
                                }} color={'primary'} variant={'outlined'}>
                                    Add Training & Certificate documents
                                </Button>
                            </Grid>
                            <Grid xs={12}>
                            <TabFormFields
                                userData={userData}
                                changeBinder={setUserData}
                            />
                        </Grid>

                       </div>

                        <Grid item md={12}>
                            <Button style={{borderRadius:'2px'}} onClick={submitData} fullWidth variant={'outlined'}>
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
