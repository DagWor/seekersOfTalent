using Microsoft.AspNetCore.Mvc;
using SeekersOfTalent.Api.Helpers;
using SeekersOfTalent.Domain;
using SeekersOfTalent.Types.ViewModel;
using System;

namespace SeekersOfTalent.Api.Controllers
{
    public class AccountController : BaseController
    {
        IFacade _facade;
        public AccountController(IFacade facade) => _facade = facade;
        public IActionResult GetUserProfile()
        {
            try
            {
                _facade.SetSession(GetSession());
                return Ok();

            }
            catch (Exception e)
            {
                return ErrorCode(e);
            }
        }

        [HttpPost]
        public IActionResult UpdateUserProfile([FromBody] UserProfileRequest request)
        {
            try
            {
                _facade.SetSession(GetSession());
                return Ok(_facade.UpdateUserInformation(request));
            }
            catch (Exception e)
            {
                return ErrorCode(e);
            }
        }

        [HttpPost]
        public IActionResult AddNewUser(UserProfileRequest request)
        {
            try
            {
                return Ok(_facade.CreateUserInformation(request));
            }
            catch (Exception e)
            {
                return ErrorCode(e);
            }
        }


    }
}
