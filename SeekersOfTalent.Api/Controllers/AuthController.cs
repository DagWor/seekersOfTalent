using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SeekersOfTalent.Api.Helpers;
using SeekersOfTalent.Types;
using SeekersOfTalent.Types.Constants;
using SeekersOfTalent.Types.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeekersOfTalent.Api.Controllers
{
    [Route("api/sot/[controller]/[action]")]
    [ApiController]
    public class AuthController : BaseController
    {
        [HttpPost]
        public IActionResult Login([FromBody]LoginViewModel loginModel)
        {
            try
            {
                UserSession session = new UserSession();
                HttpContext.Session.SetSession(SessionConstants.NAME, session);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(501, new { message = e.Message });
            }
        }
        

        [HttpGet]
        public IActionResult Logout()
        {
            try
            {
                HttpContext.Session.Clear();
                return Json(true);
            }
            catch (Exception e)
            {
                return ErrorCode(e);
            }
        }


    }
}
