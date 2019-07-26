using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SeekersOfTalent.Types;
using SeekersOfTalent.Types.Constants;
using System;

namespace SeekersOfTalent.Api.Helpers
{
    public class BaseController : Controller
    {
        public UserSession GetSession()
        {

            var session = HttpContext.Session.GetString(SessionConstants.NAME);
            if (session == null)
            {
                throw new Exception("Not Authenticated");
            }
            return JsonConvert.DeserializeObject<UserSession>(session);
        }

        public IActionResult ErrorCode(Exception e)
        {
            return StatusCode(501, new { message = e.Message });
        }
    }
}
