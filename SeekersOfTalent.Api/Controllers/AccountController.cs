using Microsoft.AspNetCore.Mvc;
using SeekersOfTalent.Api.Helpers;
using System;

namespace SeekersOfTalent.Api.Controllers
{
    public class AccountController : BaseController
    {
        public IActionResult GetUserProfile()
        {
            try
            {
                return Ok();
            }
            catch (Exception e)
            {
                return ErrorCode(e);
            }
        }

        public IActionResult UpdateUserProfile()
        {
            try
            {
                return Ok();
            }
            catch (Exception e)
            {
                return ErrorCode(e);
            }
        }

        public IActionResult AddNewUser()
        {
            try
            {
                return Ok();
            }
            catch (Exception e)
            {
                return ErrorCode(e);
            }
        }


    }
}
