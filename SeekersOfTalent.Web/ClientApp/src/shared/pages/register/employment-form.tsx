import React, {Fragment, useState} from 'react'
import TextField from '@material-ui/core/TextField'
import { Grid, Button } from '@material-ui/core';
import Typography from "@material-ui/core/Typography/Typography";
import {EmploymentViewModel} from "../../../_view_model/emoployment";
import {UserProfileRequest} from "../../../_view_model/user-information";
import {EducationViewModel} from "../../../_view_model/education";
import Card from "@material-ui/core/Card/Card";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";


interface IProps{
    userData : UserProfileRequest
    changeBinder : (userData : UserProfileRequest)=>void
}

const initEmp : EmploymentViewModel={
    id: 0,
    position: '',
    jobDescription: '',
    startDate: '',
    endDate: ''
}

function EmploymentForm (props : IProps){
    const [empData,setEmplData] = useState(initEmp)


    function emplymentRow(value:EmploymentViewModel , key:number){
        return (
            <Grid item xs={12} key={key}><Card>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {value.position}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {value.jobDescription}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small"
                            color="secondary"
                            variant={'outlined'}
                            onClick={()=>
                            {
                                let temp = props.userData.employementHistory
                                temp.splice(key,1)
                                props.changeBinder({...props.userData,employementHistory:temp})
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
            {props.userData.employementHistory.map(emplymentRow)}
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    label="Job Position"
                    value={empData.position}
                    onChange={(event)=>setEmplData({...empData,position:event.target.value})}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    multiline
                    rows={5}
                    label="Job Description"
                    value={empData.jobDescription}
                    onChange={(event)=>setEmplData({...empData,jobDescription:event.target.value})}
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
                    value={empData.startDate}
                    id={'date'}
                    type={'date'}
                    onChange={(event)=>setEmplData({...empData,startDate:event.target.value})}
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
                    onChange={(event)=>setEmplData({...empData,endDate:event.target.value})}
                  />
            </Grid>

            <Grid item md={4}>
                <Button
                    onClick={()=>props.changeBinder({...props.userData,employementHistory:[...props.userData.employementHistory,empData]})}
                    style={{borderRadius:'2px',color:'green'}}
                    fullWidth variant={'outlined'}>
                    ADD
                </Button>
            </Grid>
        </Grid>
    )
}



export default EmploymentForm