import React, {Fragment, useState} from 'react'
import {EducationViewModel} from './../../../_view_model/education'
import TextField from '@material-ui/core/TextField'
import { Grid, Button } from '@material-ui/core';
import Typography from "@material-ui/core/Typography/Typography";
import {UserProfileRequest} from "../../../_view_model/user-information";
import {SkillViewModel} from "../../../_view_model/skill";
import Card from "@material-ui/core/Card/Card";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";


interface IProps{
    userData : UserProfileRequest
    changeBinder : (userData : UserProfileRequest)=>void
}

const initEduc: EducationViewModel = {
    id: 0,
    fieldOfStudy: '',
    description: '',
    startDate: '',
    endDate: '',
}
function EducationForm (props : IProps){
    const [educData , setEducData] = useState(initEduc)


    function educationRow(value:EducationViewModel , key:number){
        return (
            <Grid item xs={12} key={key}><Card>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {value.fieldOfStudy}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {value.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small"
                            color="secondary"
                            variant={'outlined'}
                            onClick={()=>
                            {
                                let temp = props.userData.educationHistory
                                temp.splice(key,1)
                                props.changeBinder({...props.userData,educationHistory:temp})
                            }}>
                        Remove
                    </Button>
                </CardActions>
            </Card>
            </Grid>
        )
    }


    return (
        <Grid container justify={'flex-start'} spacing={4}>
            {
                props.userData.educationHistory.map(educationRow)
            }
            <Grid item xs={12}>
                <TextField
                        required
                        fullWidth
                        label="field of study"
                        value={educData.fieldOfStudy}
                        onChange={(event)=>setEducData({...educData,fieldOfStudy:event.target.value})}
                    />
            </Grid>
            <Grid item xs={12}>
                <TextField
                        fullWidth
                        multiline
                        rows={5}
                        label="Field Description"
                        value={educData.description}
                        onChange={(event)=>setEducData({...educData,description:event.target.value})}
                    />  
            </Grid>
            <Grid item md={4} xs={12}>
                <Typography>
                    Start Date
                </Typography>
            </Grid>
            <Grid item md={8} xs={12}>
                <TextField
                    required
                    defaultValue="2017-05-24"
                    fullWidth
                    id={'date'}
                    type={'date'}
                    onChange={(event)=>setEducData({...educData,startDate:event.target.value})}
                />
            </Grid>

            <Grid item md={4} xs={12}>
                <Typography>
                    End Date
                </Typography>
            </Grid>
            <Grid item md={8} xs={12}>
                <TextField
                    required
                    defaultValue="2017-05-24"
                    fullWidth
                    id={'date'}
                    type={'date'}
                    onChange={(event)=>setEducData({...educData,endDate:event.target.value})}
                />
            </Grid>

            <Grid item md={4}>
                <Button style={{borderRadius:'2px'}}
                        onClick={()=>props.changeBinder({...props.userData,educationHistory:[...props.userData.educationHistory,educData]})}
                        fullWidth variant={'outlined'}>
                    Add
                </Button>
            </Grid>
        </Grid>
    )
}



export default EducationForm