import {AvailabilityViewModel } from './availability'
import {SkillViewModel} from './skill'
import {PortfolioViewModel} from './portfolio'
import {EmploymentViewModel} from './emoployment'
import {DocumentRequest , DocumentResponse} from './document'


export interface UserProfileRequest {
    id?: string;
    firstName: string;
    phoneNumber: string;
    lastName: string;
    birthDate: string;
    isAvailable: AvailabilityViewModel;
    bio: string;
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
    bio: string;
    availablityInfo: AvailabilityViewModel;
    skills: SkillViewModel[];
    portfolio: PortfolioViewModel;
    employementHistory: EmploymentViewModel[];
    educationHistory: EducationViewModel[];
    profilePicture: DocumentResponse;
    otherDocs: DocumentResponse[];
}