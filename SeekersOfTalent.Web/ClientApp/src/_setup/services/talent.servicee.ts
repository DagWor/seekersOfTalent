import Axios from 'axios';
import { baseUrl } from './url.config';
import config from './header.config';
import { SearchParamsViewModel } from '../../_view_model/search-params';


export default class TalentService {

    fetchTalentList(searchPrms:SearchParamsViewModel){
        let url = `${baseUrl}Account/GetEmployeeList`
        return Axios.post(url,searchPrms,{...config})
    }
}