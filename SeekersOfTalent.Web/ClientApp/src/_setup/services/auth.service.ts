import Axios from 'axios';
import { baseUrl } from './url.config';
import config from './header.config';
import {LoginViewModel} from './../../_view_model/login-view-model'


export default class AuthService {

    validateCredention(data : LoginViewModel){
        let url = `${baseUrl}Auth/Login`
        return Axios.post(url, data,{...config})
    }

    checkSessionValidity(){
        let url = `${baseUrl}Auth/CheckSession`
        return Axios.get(url,{...config})
    }

    logoutUser(){
        let url=`${baseUrl}Auth/Logout`
        return Axios.get(url,{...config})
    }
}