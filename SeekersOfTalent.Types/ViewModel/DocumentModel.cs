using System;

namespace SeekersOfTalent.Types.ViewModel
{
    public class DocumentRequest
    {
        public Guid? Id { get; set; }
        public string MimeType { get; set; }
        public string FileName { get; set; }
        public string File { get; set; }
    }
    public class DocumentResponse
    {
        public Guid Id { get; set; }
        public string MimeType { get; set; }
        public string FileName { get; set; }
        public DateTime DateUploaded { get; set; }
    }
}
