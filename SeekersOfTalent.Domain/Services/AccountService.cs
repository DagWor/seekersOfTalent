using SeekersOfTalent.Data.SotEntities;
using SeekersOfTalent.Domain.Infrastructure;
using SeekersOfTalent.Types.ViewModel;
using System;
using System.Collections.Generic;

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
                user = Context.UserInformation.Find(request.Id);

                user.Id = Guid.NewGuid();
                user.FirstName = request.FirstName;
                user.LastName = request.LastName;
                user.Email = request.Email;

                user.DateOfBirth = request.BirthDate;
                user.ProfileImg = UpdateProfilePicture(request.ProfilePicture, user.ProfileImg);
                user.PhoneNumber = request.PhoneNumber;
                user.Biography = request.Bio;
                user.RoleId = (int)request.Role;
                Context.UserInformation.Add(user);
                Context.SaveChanges();

                SaveOtherDocumets(user.Id, request.OtherDocs);
            }

            if (request.Role == Types.Constants.RoleType.Employee)
                SaveTalentData(request, user);

            return GetUserProfileById(user.Id);
        }

        internal List<UserProfileResponse> GetEmployeeProfileList(SearchParamsViewModel searchParams)
        {
            throw new NotImplementedException();
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
                Context.EmployeeSkill.Add(new EmployeeSkill
                {
                    EmployeeId = user.Id,
                    ExpertiseLvlId = skl.LevelOfExpertise.Id,
                    SkillId = skl.Id
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

#warning Employee can not save other docs yet
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
