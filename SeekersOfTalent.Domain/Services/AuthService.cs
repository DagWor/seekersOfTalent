using SeekersOfTalent.Data.SotEntities;
using SeekersOfTalent.Domain.Infrastructure;
using SeekersOfTalent.Types;
using SeekersOfTalent.Types.ViewModel;
using System;
using System.Linq;



namespace SeekersOfTalent.Domain.Services
{
    public class AuthService : SotServiceBase, IAuthService
    {
        public AuthService(SotContext context) => Context = context;
        public bool AuthenticateUser(out UserSession session, LoginViewModel request)
        {
            session = null;
            try
            {
                var usr = Context.UserInformation.FirstOrDefault(u => u.Email.Equals(request.Email) &&
                                                                      u.Password.Equals(request.Password) &&
                                                                      u.Role.Id == request.Role);
                if (usr == null)
                    throw new Exception();
                session = new UserSession
                {
                    Id = usr.Id,
                    Email = usr.Email,
                    PhoneNumber = usr.PhoneNumber,
                    Role = (SeekersOfTalent.Types.Constants.RoleType)usr.RoleId,
                    FirstName = usr.FirstName,
                    LastName = usr.LastName
                };
                return true;
            }
            catch
            {
                return false;
            }
        }


    }
}
