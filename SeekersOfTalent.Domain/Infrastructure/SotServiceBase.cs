using SeekersOfTalent.Data.SotEntities;
using SeekersOfTalent.Types.ViewModel;
using System;
using System.Linq;

namespace SeekersOfTalent.Domain.Infrastructure
{
    public class SotServiceBase : IDocumentServiceBase
    {
        public SotContext Context { get; set; }
        //public UserClaim Claim { get; set; }

        //public void SetContext(OlcContext _context) => Context = _context;
        //public void SetClaim(UserClaim claim) => Claim = claim;
        //public void PassContext(SotServiceBase _base, OlcContext _context) => _base.SetContext(_context);

        #region Document Services

        public DocumentResponse CreateDocument(DocumentRequest requst)
        {
            Document doc = new Document
            {
                Id = Guid.NewGuid(),
                DateUploaded = DateTime.Now,
                File = Convert.FromBase64String(requst.File),
                Filename = requst.FileName,
                Mimetype = requst.MimeType,
            };
            Context.Document.Add(doc);
            Context.SaveChanges();
            return GetDocumentResponseById(doc.Id);
        }

        public DocumentResponse GetDocumentResponseById(Guid docId)
        {
            var doc = Context.Document.Find(docId);
            if (doc == null)
                return null;
            DocumentResponse response = new DocumentResponse
            {
                Id = doc.Id,
                DateUploaded = doc.DateUploaded,
                FileName = doc.Filename,
                MimeType = doc.Mimetype
            };
            return response;
        }

        public DocumentRequest GetDocumentById(Guid docId)
        {
            var document = Context.Document.Find(docId);
            return document == null
                ?
                null
                :
                new DocumentRequest
                {
                    FileName = document.Filename,
                    Id = document.Id,
                    MimeType = document.Mimetype,
                    File = Convert.ToBase64String(document.File)
                };
        }


        public Document GetByteDocumentById(Guid docId)
        {
            var document = Context.Document.Find(docId);
            return document;
        }
        #endregion
    }
}
