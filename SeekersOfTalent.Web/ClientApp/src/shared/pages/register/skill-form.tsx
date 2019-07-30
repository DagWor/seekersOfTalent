import React, {Fragment, useState} from 'react'
import {SkillViewModel} from './../../../_view_model/skill'
import TextField from '@material-ui/core/TextField'
import {Grid, Button, IconButton} from '@material-ui/core';
import {UserProfileRequest} from "../../../_view_model/user-information";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Typography from "@material-ui/core/Typography/Typography";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Card from "@material-ui/core/Card/Card";


interface IProps{
    userData : UserProfileRequest
    changeBinder : (userData : UserProfileRequest)=>void
}

const initSkillInput : SkillViewModel= {
    name:'',
    description:'',
    levelOfExpertise:{
        id:1,
        name:''
    }
}


function SkillForm (props : IProps){
    const [skillInput,setSkillInput] = useState(initSkillInput)



    function skillRow(value:SkillViewModel , key:number){
        return (
            <Grid item xs={12} key={key}><Card>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {value.name}
                            </Typography>
                            {
                                value.levelOfExpertise.id==1 &&
                                <Typography variant="body2" color="textSecondary" component="p">
                                Moderate Level of Skill
                                </Typography>
                            }
                            {
                                value.levelOfExpertise.id==2 &&
                                <Typography variant="body2" color="textSecondary" component="p">
                                    High Level of Skill
                                </Typography>
                            }
                            {
                                value.levelOfExpertise.id==3 &&
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Expert On This Skill
                                </Typography>
                            }
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
                                    let temp = props.userData.skills
                                    temp.splice(key,1)
                                    props.changeBinder({...props.userData,skills:temp})
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
                props.userData.skills.map(skillRow)
            }
            <Grid item xs={12} md={8}>
                <TextField
                        required
                        fullWidth
                        label="Skill"
                        value={skillInput.name}
                        onChange={(event)=>setSkillInput({...skillInput,name:event.target.value})}
                    />
            </Grid>
            <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                    <Select
                        value={skillInput.levelOfExpertise.id}
                        onChange={(event)=>setSkillInput({...skillInput , levelOfExpertise:{id:event.target.value as number,name:''}})}
                    >
                        <MenuItem value={1}>Moderate</MenuItem>
                        <MenuItem value={2}>High</MenuItem>
                        <MenuItem value={3}>Expert</MenuItem>
                    </Select>
                    <FormHelperText>Select your level of skill</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField
                        fullWidth
                        multiline
                        rows={5}
                        label="Description"
                        value={skillInput.description}
                        onChange={(event)=>setSkillInput({...skillInput,description:event.target.value})}
                    />  
            </Grid>
            <Grid item md={4}>
                <Button onClick={()=>props.changeBinder({...props.userData,skills:[...props.userData.skills,skillInput]})}  style={{borderRadius:'2px'}} fullWidth variant={'outlined'}>
                    Add
                </Button>
            </Grid>
            
        </Grid>
    )
}



export default SkillForm