import {AvailabilityViewModel } from './availability'
import {SkillViewModel} from './skill'
import {PortfolioViewModel} from './portfolio'
import {EmploymentViewModel} from './emoployment'
import {DocumentRequest , DocumentResponse} from './document'
import { EducationViewModel } from './education'
import {RoleType} from './../_enum/role-type'

export interface UserProfileRequest {
    id?: string;
    firstName: string;
    phoneNumber: string;
    lastName: string;
    birthDate: string;
    email: string;
    role: RoleType;
    
    
    bio: string;
    availablityInfo: AvailabilityViewModel;
    skills: SkillViewModel[];
    portfolio: PortfolioViewModel;
    employementHistory: EmploymentViewModel[];
    educationHistory: EducationViewModel[];
    profilePicture: DocumentRequest;
    otherDocs: DocumentRequest[];
}

export interface UserProfileResponse {
    id?: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    role: RoleType;
    phoneNumber: string;
    email: string;
    bio: string;
    availablityInfo: AvailabilityViewModel;
    skills: SkillViewModel[];
    portfolio: PortfolioViewModel;
    employementHistory: EmploymentViewModel[];
    educationHistory: EducationViewModel[];
    profilePicture: DocumentResponse;
    otherDocs: DocumentResponse[];
}