import {RoleType} from './../_enum/role-type'


export interface UserSession {
    id: string;
    firstName: string;
    phoneNumber: string;
    role: RoleType;
    lastName: string;
    email: string;
}