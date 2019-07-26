using Microsoft.AspNetCore.Mvc;
using SeekersOfTalent.Api.Helpers;
using SeekersOfTalent.Domain;
using SeekersOfTalent.Types.ViewModel;
using System;

namespace SeekersOfTalent.Api.Controllers
{
    [ApiController]
    [Route("api/sot/[controller]/[action]")]
    public class AccountController : BaseController
    {
        IFacade _facade;
        public AccountController(IFacade facade) => _facade = facade;


        [HttpGet("{userId}")]
        public IActionResult GetUserProfile(Guid userId)
        {
            try
            {
                _facade.SetSession(GetSession());
                return Ok(_facade.GetUserProfile(userId));

            }
            catch (Exception e)
            {
                return ErrorCode(e);
            }
        }


        [HttpPost]
        public IActionResult GetEmployeeList([FromBody] SearchParamsViewModel searchPrms)
        {
            try
            {
                _facade.SetSession(GetSession());
                return Ok(_facade.GetEmployeeProfileList(searchPrms));

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
                return Ok(_facade.CreateUserInformation(request));
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
