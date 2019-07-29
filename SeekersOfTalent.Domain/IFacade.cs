using SeekersOfTalent.Types;
using SeekersOfTalent.Types.ViewModel;
using System;
using System.Collections.Generic;

namespace SeekersOfTalent.Domain
{
    public interface IFacade
    {
        void SetSession(UserSession session);
        UserProfileResponse CreateUserInformation(UserProfileRequest request);

        UserProfileResponse GetUserProfile(Guid userId);

        List<UserProfileResponse> GetEmployeeProfileList(SearchParamsViewModel spr);

        DocumentRequest GetDocumentByteById(Guid docId);
    }
}
