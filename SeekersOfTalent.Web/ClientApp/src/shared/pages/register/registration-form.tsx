import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Container, Typography, Button } from '@material-ui/core';
import { UserProfileRequest } from '../../../_view_model/user-information';
import { RoleType } from '../../../_enum/role-type';

export default function RegistrationForm() {
    const initialState:UserProfileRequest ={
        firstName:'',
        phoneNumber: '',
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
            mimeType:'',
            fileName:'',
            file:''
        },
        otherDocs: []
    }
    const [userData, setUserData] = useState(initialState)
    
    const submitData = ()=>{
        console.log('User data ',userData)
    }

    return (
        <div>
            <Container component={'main'} maxWidth={'md'}> 
                <Grid container justify={'center'}>
                    <Grid item xs={10}>
                        <Grid container spacing={2} justify={'flex-start'}>
                        
                        <Grid item md={6}>
                            <TextField
                                required
                                fullWidth
                                label="Firstname"
                                name="firstname"
                                onChange={(event)=>setUserData({...userData,firstName:event.target.value})}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                required
                                fullWidth
                                label="Lastname"
                                name="lastname"
                            />
                        </Grid>
                        <Grid item md={12}>
                            <TextField
                                required
                                fullWidth
                                label="Email"
                                name="email"
                            />
                        </Grid>
                        <Grid item md={12}>
                            <TextField
                                required
                                fullWidth
                                label="Phone Number"
                                name="phoneNumber"
                            />
                        </Grid>
                        <Grid item md={12}>
                            <TextField
                                required
                                label="Birthdate"
                                defaultValue="2017-05-24"
                                fullWidth
                                id={'date'}
                                type={'date'}
                                name="birthDate"
                            />
                        </Grid>

                        <Grid item md={6}>
                            <Typography>Role : </Typography>
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                required
                                fullWidth
                                label="Employee"
                                name="firstname"
                            />
                        </Grid>

                        <Grid item md={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={5}
                                label="Bio"
                                name="bio"
                            />
                        </Grid>
                        <Grid item md={12}>
                            <TextField
                                required
                                fullWidth
                                label="Employee"
                                name="firstname"
                            />
                        </Grid>
                        <Grid item md={12}>
                            <Button onClick={submitData} fullWidth variant={'outlined'}>
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
