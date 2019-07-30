using SeekersOfTalent.Data.SotEntities;
using SeekersOfTalent.Domain.Infrastructure;
using SeekersOfTalent.Types.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SeekersOfTalent.Domain.Services
{
    public class AccountService : SotServiceBase
    {
        public UserProfileResponse CreateUserInformation(UserProfileRequest request)
        {
            Data.SotEntities.UserInformation user;
            if (request.Id != null)
            {
                user = Context.UserInformation.Find(request.Id);
                user.FirstName = request.FirstName;
                user.LastName = request.LastName;
                user.Email = request.Email;

                user.DateOfBirth = request.BirthDate;

                user.ProfileImg = UpdateProfilePicture(request.ProfilePicture, user.ProfileImg);
                user.PhoneNumber = request.PhoneNumber;
                user.Biography = request.Bio;

                Context.UserInformation.Update(user);
                Context.SaveChanges();

                //Clearing Existing user data

                ClearUserData(user.Id);

                SaveOtherDocumets(user.Id, request.OtherDocs);
            }
            else
            {
                user = new UserInformation();

                user.Id = Guid.NewGuid();
                user.FirstName = request.FirstName;
                user.LastName = request.LastName;
                user.Email = request.Email;

                user.DateOfBirth = request.BirthDate;
                user.ProfileImg = UpdateProfilePicture(request.ProfilePicture, user.ProfileImg);
                user.PhoneNumber = request.PhoneNumber;
                user.Biography = request.Bio;
                user.RoleId = (int)request.Role;
                user.Password = request.Password;
                Context.UserInformation.Add(user);
                Context.SaveChanges();

                SaveOtherDocumets(user.Id, request.OtherDocs);
            }

            if (request.Role == Types.Constants.RoleType.EMPLOYEE)
                SaveTalentData(request, user);

            return GetUserProfileById(user.Id);
        }

        internal List<UserProfileResponse> GetEmployeeProfileList(SearchParamsViewModel searchParams)
        {
            List<UserProfileResponse> response = new List<UserProfileResponse>();
            var list = Context.UserInformation.Where(usr => usr.RoleId == (int)SeekersOfTalent.Types.Constants.RoleType.EMPLOYEE).ToList();
            list.ForEach(ls => response.Add(GetUserProfileById(ls.Id)));

            GetEmplMatchingExpertise(searchParams.LevelOfExpertise, response);
            GetEmplMatchingSkillType(searchParams.TypeOfSkill, response);
            GetEmplMatchingFieldOfStudy(searchParams.StudyField, response);
            return response;
        }

        private List<UserProfileResponse> GetEmplMatchingExpertise(int lvlOfExp, List<UserProfileResponse> filteredList)
        {
            if (lvlOfExp == 0)
                return filteredList;
            var list = Context.EmployeeSkill.Where(empl => empl.ExpertiseLvlId == lvlOfExp).ToList();
            for (int i = 0; i < filteredList.Count; i++)
            {
                if (list.Find(empl => empl.EmployeeId == (Guid)filteredList[i].Id) == null)
                    filteredList.Remove(filteredList[i]);
            }
            return filteredList;
        }
        private List<UserProfileResponse> GetEmplMatchingSkillType(string skillType, List<UserProfileResponse> filteredList)
        {
            if (skillType == "")
                return filteredList;

            var list = Context.EmployeeSkill.Where(empl => empl.Skill.Name == skillType).ToList();
            for (int i = 0; i < filteredList.Count; i++)
            {
                if (list.Find(empl => empl.EmployeeId == (Guid)filteredList[i].Id) == null)
                    filteredList.Remove(filteredList[i]);
            }
            return filteredList;
        }
        private List<UserProfileResponse> GetEmplMatchingFieldOfStudy(string field, List<UserProfileResponse> filteredList)
        {
            if (field == "")
                return filteredList;
            var list = Context.EducationHistory.Where(empl => empl.Field.Equals(field)).ToList();
            for (int i = 0; i < filteredList.Count; i++)
            {
                if (list.Find(empl => empl.EmployeeId == (Guid)filteredList[i].Id) == null)
                    filteredList.Remove(filteredList[i]);
            }
            return filteredList;
        }




        private void SaveTalentData(UserProfileRequest request, UserInformation user)
        {
            Context.EmployeeAvailability.Add(new Data.SotEntities.EmployeeAvailability
            {
                Available = request.AvailablityInfo.IsAvailable,
                EmployeeId = user.Id,
                Reason = request.AvailablityInfo.Explanation
            });
            Context.SaveChanges();


            request.Skills.ForEach(skl =>
            {

                SkillType skill = new SkillType
                {
                    Name = skl.Name,
                    Description = skl.Description
                };
                Context.SkillType.Add(skill);
                Context.SaveChanges();

                Context.EmployeeSkill.Add(new EmployeeSkill
                {
                    EmployeeId = user.Id,
                    ExpertiseLvlId = skl.LevelOfExpertise.Id,
                    SkillId = skill.Id
                });
                Context.SaveChanges();
            });

            Context.EmployeePortfolio.Add(new EmployeePortfolio
            {
                EmployeeId = user.Id,
                Projects = SerializeObjectToJson(request.Portfolio.Projects)
            });
            Context.SaveChanges();


            request.EmployementHistory.ForEach(es =>
            {
                Context.EmploymentHistory.Add(new EmploymentHistory
                {
                    Description = es.JobDescription,
                    EmployeeId = user.Id,
                    Position = es.Position,
                    StartDate = es.StartDate,
                    EndDate = es.EndDate
                });
                Context.SaveChanges();
            });

            request.EducationHistory.ForEach(eds =>
            {
                Context.EducationHistory.Add(new EducationHistory
                {
                    Description = eds.Description,
                    EndDate = eds.EndDate,
                    StartDate = eds.StartDate,
                    EmployeeId = user.Id,
                    Field = eds.FieldOfStudy
                });
                Context.SaveChanges();
            });


        }

        private void SaveOtherDocumets(Guid id, List<DocumentRequest> otherDocs)
        {
            otherDocs.ForEach(doc =>
            {
                if (String.IsNullOrWhiteSpace(doc.Id.ToString()))
                {
                    var trcDoc = CreateDocument(doc);
                }
            });
        }

        public void ClearUserData(Guid userId)
        {
            var user = Context.UserInformation.Find(userId);

            //var avl = Context.EmployeeAvailability.Where(ea => ea.EmployeeId == userId);
            //Context.RemoveRange(avl);
            //Context.SaveChanges();

            Context.EmployeeAvailability.RemoveRange(user.EmployeeAvailability);
            Context.SaveChanges();
            Context.EmployeeSkill.RemoveRange(user.EmployeeSkill);
            Context.SaveChanges();
            Context.EmployeePortfolio.RemoveRange(user.EmployeePortfolio);
            Context.SaveChanges();
            Context.EducationHistory.RemoveRange(user.EducationHistory);
            Context.SaveChanges();
        }

        private Guid? UpdateProfilePicture(DocumentRequest img, Guid? prevProfile = null)
        {
            if (String.IsNullOrWhiteSpace(img.File))
                return prevProfile;
            return CreateDocument(img).Id;
        }

        public void UpdateTalentRecord()
        {

        }
    }
}
