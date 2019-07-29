using SeekersOfTalent.Data.SotEntities;
using SeekersOfTalent.Domain.Infrastructure;
using SeekersOfTalent.Domain.Services;
using SeekersOfTalent.Types;
using SeekersOfTalent.Types.ViewModel;
using System;
using System.Collections.Generic;

namespace SeekersOfTalent.Domain
{
    public class Facade : SotServiceBase, IFacade
    {
        readonly AccountService _accountService;
        public Facade(SotContext context)
        {
            Context = context;
            _accountService = new AccountService();
        }

        new public void SetSession(UserSession session)
        {
            _accountService.SetSession(session);
        }

        public UserProfileResponse CreateUserInformation(UserProfileRequest request)
        {
            PassContext(_accountService, Context);
            return _accountService.CreateUserInformation(request);
        }

        public UserProfileResponse GetUserProfile(Guid userId) => GetUserProfileById(userId);

        public List<UserProfileResponse> GetEmployeeProfileList(SearchParamsViewModel searchParams)
        {
            PassContext(_accountService, Context);
            return _accountService.GetEmployeeProfileList(searchParams);
        }

        public DocumentRequest GetDocumentByteById(Guid docId)
        {
            return GetDocumentById(docId);
        }
    }
}
