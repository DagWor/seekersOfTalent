import Axios from 'axios';
import { baseUrl } from './url.config';
import config from './header.config';



export default class AssetService {
    //#region Asset action API calls
    loadAssets(){
        let url = `${baseUrl}employee/get-all-asset`
        return Axios.get(url,{...config})
    }
}