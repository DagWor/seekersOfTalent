﻿using Microsoft.AspNetCore.Mvc;
using SeekersOfTalent.Api.Helpers;
using SeekersOfTalent.Domain.Services;
using SeekersOfTalent.Types;
using SeekersOfTalent.Types.Constants;
using SeekersOfTalent.Types.ViewModel;
using System;

namespace SeekersOfTalent.Api.Controllers
{
    [Route("api/sot/[controller]/[action]")]
    [ApiController]
    public class AuthController : BaseController
    {
        private IAuthService _authService;
        public AuthController(IAuthService auth) => _authService = auth;

        [HttpPost]
        public IActionResult Login([FromBody]LoginViewModel loginModel)
        {
            try
            {
                UserSession session;
                var isValid = _authService.AuthenticateUser(out session, loginModel);
                if (!isValid)
                    return NotFound();
                HttpContext.Session.SetSession(SessionConstants.NAME, session);
                return Ok(session);
            }
            catch (Exception e)
            {
                return StatusCode(501, new { message = e.Message });
            }
        }

        [HttpGet]
        public IActionResult CheckSession()
        {
            try
            {
                var session = GetSession();
                return Ok(session);
            }
            catch (Exception e)
            {
                return ErrorCode(e);
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
