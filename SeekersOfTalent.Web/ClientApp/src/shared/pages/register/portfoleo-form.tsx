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
import {PortfolioViewModel, Project} from "../../../_view_model/portfolio";


interface IProps{
    userData : UserProfileRequest
    changeBinder : (userData : UserProfileRequest)=>void
}

const initPrt : Project={
    name: '',
    description: '',
    links: ''
}
/*const initArray : PortfolioViewModel={
    employeeId:'',
    projects:[],
    id:0
}*/
function PortfoleoForm (props : IProps){
    const [prtData,setPrtData] = useState(initPrt)

    function portfoleoRow(value:Project , key:number){
        return (
            <Grid item xs={12} key={key}><Card>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {value.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {value.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Link :  {value.links}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small"
                            color="secondary"
                            variant={'outlined'}
                            onClick={()=>
                            {
                                let temp = props.userData.portfolio
                                temp.projects.splice(key,1)
                                props.changeBinder({...props.userData,portfolio:temp})
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
            {props.userData.portfolio.projects.map(portfoleoRow)}
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    label="Headline"
                    value={prtData.name}
                    onChange={(event)=>setPrtData({...prtData,name:event.target.value})}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    multiline
                    rows={5}
                    label="Description"
                    value={prtData.description}
                    onChange={(event)=>setPrtData({...prtData,description:event.target.value})}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Links"
                    value={prtData.links}
                    onChange={(event)=>setPrtData({...prtData,links:event.target.value})}
                />
            </Grid>
            <Grid item md={4}>
                <Button
                    onClick={()=>{
                        props.changeBinder({...props.userData,portfolio:{id:0,employeeId: '',projects: [...props.userData.portfolio.projects,prtData]}})
                    }}
                    style={{borderRadius:'2px',color:'green'}}
                    fullWidth variant={'outlined'}>
                    ADD
                </Button>
            </Grid>
        </Grid>
    )
}



export default PortfoleoForm