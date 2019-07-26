using SeekersOfTalent.Types.Constants;
using System;
using System.Collections.Generic;

namespace SeekersOfTalent.Types.ViewModel
{
    public class UserProfileRequest
    {
        public UserProfileRequest()
        {
            Skills = new List<SkillViewModel>();
            Portfolio = new PortfolioViewModel();
            EmployementHistory = new List<EmploymentViewModel>();
            EducationHistory = new List<EducationViewModel>();
            ProfilePicture = new DocumentRequest();
            OtherDocs = new List<DocumentRequest>();
        }

        //basic information 
        public Guid? Id { get; set; }
        public string FirstName { get; set; }
        public string PhoneNumber { get; set; }
        public string LastName { get; set; }
        public string BirthDate { get; set; }
        public string Email { get; set; }
        public RoleType Role { get; set; }


        //meta data
        public string Bio { get; set; }
        public AvailabilityViewModel AvailablityInfo { get; set; }
        public List<SkillViewModel> Skills { get; set; }
        public PortfolioViewModel Portfolio { get; set; }
        public List<EmploymentViewModel> EmployementHistory { get; set; }
        public List<EducationViewModel> EducationHistory { get; set; }
        public DocumentRequest ProfilePicture { get; set; }
        public List<DocumentRequest> OtherDocs { get; set; }
    }
    public class UserProfileResponse
    {
        public UserProfileResponse()
        {
            Skills = new List<SkillViewModel>();
            Portfolio = new PortfolioViewModel();
            EmployementHistory = new List<EmploymentViewModel>();
            EducationHistory = new List<EducationViewModel>();
            ProfilePicture = new DocumentResponse();
            OtherDocs = new List<DocumentResponse>();
        }

        //basic information 
        public Guid? Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string BirthDate { get; set; }
        public RoleType Role { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }


        //meta data
        public string Bio { get; set; }
        public AvailabilityViewModel AvailablityInfo { get; set; }
        public List<SkillViewModel> Skills { get; set; }
        public PortfolioViewModel Portfolio { get; set; }
        public List<EmploymentViewModel> EmployementHistory { get; set; }
        public List<EducationViewModel> EducationHistory { get; set; }
        public DocumentResponse ProfilePicture { get; set; }
        public List<DocumentResponse> OtherDocs { get; set; }
    }
}
