using Microsoft.AspNetCore.Mvc;
using SeekersOfTalent.Api.Helpers;
using SeekersOfTalent.Domain;
using System;

namespace olc.api.Controllers
{
    [ApiController]
    [Route("api/sot/[controller]/[action]")]
    public class DocumentController : BaseController
    {
        private readonly IFacade _facade;
        public DocumentController(IFacade facade) => _facade = facade;

        [HttpGet("{docId}")]
        public IActionResult GetDocumentById(Guid docId)
        {
            try
            {
                var document = _facade.GetDocumentByteById(docId);
                if (document == null)
                    return NotFound();
                return File(document.File, document.Mimetype, document.Filename);
            }
            catch (Exception e)
            {
                return StatusCode(501, new { message = e.Message });
            }
        }
    }
}
