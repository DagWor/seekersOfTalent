import Axios from 'axios';
import { baseUrl } from './url.config';
import config from './header.config';
import {UserProfileRequest} from './../../_view_model/user-information'


export default class AccountService {
    //#region Asset action API calls
    createNewUser(data : UserProfileRequest){
        let url = `${baseUrl}Account/AddNewUser`
        return Axios.post(url, data,{...config})
    }

    getUserProfile(userId : string){
        let url = `${baseUrl}Account/GetUserProfile/${userId}`
        return Axios.get(url,{...config})
    }
}