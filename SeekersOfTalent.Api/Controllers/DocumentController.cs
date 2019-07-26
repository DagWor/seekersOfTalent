using Microsoft.AspNetCore.Mvc;
using SeekersOfTalent.Api.Helpers;
using SeekersOfTalent.Domain;
using System;

namespace olc.api.Controllers
{
    [ApiController]
    [Route("api/olc/[controller]")]
    public class DocumentController : BaseController
    {
        private readonly IFacade _facade;
        public DocumentController(IFacade facade) => _facade = facade;

        [HttpGet("{action}/{docId}")]
        public IActionResult GetDocumentById(Guid docId)
        {
            try
            {
                return Ok();
                //var document = _facade.GetByteDocumentById(docId);
                //if (document == null)
                //    return NotFound();

                //System.IO.File.WriteAllBytes(Directory.GetCurrentDirectory(), document.File);

                //return File(document.File,document.Mimetype,null);

                //return Ok(File(document.File, document.MimeType, document.FileName));
            }
            catch (Exception e)
            {
                return StatusCode(501, new { message = e.Message });
            }
        }
    }
}
