import {UserProfileResponse,UserProfileRequest} from './../../_view_model/user-information'
import { RoleType } from '../../_enum/role-type';

export default function convertResponseToRequest(response : UserProfileResponse):UserProfileRequest{
    const requestModel : UserProfileRequest ={
        id:response.id,
        firstName:response.firstName,
        phoneNumber: response.phoneNumber,
        password:'',
        lastName: response.lastName,
        birthDate:response.birthDate,
        email: response.email,
        role: response.role,
        bio: response.bio,
        availablityInfo: response.availablityInfo,
        skills: response.skills,
        portfolio: response.portfolio,
        employementHistory: response.employementHistory,
        educationHistory: response.educationHistory,
        
        profilePicture: {
            id:undefined,
            mimeType:'',
            fileName:'',
            file:''
        },
        otherDocs: []
    }
    return requestModel
}


export const  defaultRequestValue : UserProfileRequest = { 
    firstName:'',
    phoneNumber: '',
    password:'',
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
        id:undefined,
        mimeType:'',
        fileName:'',
        file:''
    },
    otherDocs: []
}