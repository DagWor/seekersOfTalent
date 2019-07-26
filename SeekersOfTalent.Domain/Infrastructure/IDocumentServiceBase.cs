using SeekersOfTalent.Types.ViewModel;
using System;

namespace SeekersOfTalent.Domain.Infrastructure
{
    public interface IDocumentServiceBase
    {
        DocumentResponse GetDocumentResponseById(Guid docId);

        DocumentRequest GetDocumentById(Guid docId);

        DocumentResponse CreateDocument(DocumentRequest requst);
    }
}
