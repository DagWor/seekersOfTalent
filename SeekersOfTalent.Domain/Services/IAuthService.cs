using SeekersOfTalent.Types;
using SeekersOfTalent.Types.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeekersOfTalent.Domain.Services
{
    public interface IAuthService
    {
        bool AuthenticateUser(out UserSession session, LoginViewModel request);
    }
}
