using SeekersOfTalent.Domain.Infrastructure;
using SeekersOfTalent.Types.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeekersOfTalent.Domain.Services
{
    public class AccountService : SotServiceBase
    {
        public UserProfileResponse CreateUserInformation(UserProfileRequest request)
        {
            return GetUserProfileById(Guid.NewGuid());
        }

        public void UpdateTalentRecord()
        {

        }
    }
}
