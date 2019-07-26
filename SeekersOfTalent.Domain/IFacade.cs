using SeekersOfTalent.Types;
using SeekersOfTalent.Types.ViewModel;

namespace SeekersOfTalent.Domain
{
    public interface IFacade
    {
        void SetSession(UserSession session);
        UserProfileResponse CreateUserInformation(UserProfileRequest request);
        UserProfileResponse UpdateUserInformation(UserProfileRequest request);
    }
}
