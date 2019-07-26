using SeekersOfTalent.Domain.Infrastructure;
using SeekersOfTalent.Types.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SeekersOfTalent.Domain.Services
{
    public class AccountService : SotServiceBase
    {
        public UserProfileResponse CreateUserInformation(UserProfileRequest request)
        {
            if (request.Id != null)
            {
                var user = Context.UserInformation.Find(request.Id);
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
                Data.SotEntities.UserInformation user = Context.UserInformation.Find(request.Id);

                user.Id = Guid.NewGuid();
                user.FirstName = request.FirstName;
                user.LastName = request.LastName;
                user.Email = request.Email;

                user.DateOfBirth = request.BirthDate;
                user.ProfileImg = UpdateProfilePicture(request.ProfilePicture, user.ProfileImg);
                user.PhoneNumber = request.PhoneNumber;
                user.Biography = request.Bio;

                Context.UserInformation.Add(user);
                Context.SaveChanges();

                SaveOtherDocumets(user.Id, request.OtherDocs);
            }

            return GetUserProfileById(Guid.NewGuid());
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

        private Guid? UpdateProfilePicture(DocumentRequest img , Guid? prevProfile = null)
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
