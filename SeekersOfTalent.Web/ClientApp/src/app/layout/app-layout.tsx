import React, { Fragment } from 'react'
import NavBar from '../../shared/navbar';
import AppRouter from '../configs/app-router';

export default function AppLayout() {
    return (
        <Fragment>
            <NavBar/>
            <AppRouter/>
        </Fragment>
    )
}
