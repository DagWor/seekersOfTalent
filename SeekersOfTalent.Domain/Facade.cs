using SeekersOfTalent.Data.SotEntities;
using SeekersOfTalent.Domain.Infrastructure;
using SeekersOfTalent.Domain.Services;
using SeekersOfTalent.Types;
using SeekersOfTalent.Types.ViewModel;

namespace SeekersOfTalent.Domain
{
    public class Facade : SotServiceBase, IFacade
    {
        readonly AccountService _accountService;
        public Facade(SotContext context)
        {
            Context = context;
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


        public UserProfileResponse UpdateUserInformation(UserProfileRequest request)
        {
            PassContext(_accountService, Context);
            return _accountService.CreateUserInformation(request);
        }
    }
}
