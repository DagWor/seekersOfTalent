using System;
using System.Collections.Generic;

namespace SeekersOfTalent.Data.SotEntities
{
    public partial class Document
    {
        public Document()
        {
            EmployeeDocs = new HashSet<EmployeeDocs>();
        }

        public Guid Id { get; set; }
        public string Mimetype { get; set; }
        public string Filename { get; set; }
        public byte[] File { get; set; }
        public DateTime DateUploaded { get; set; }

        public virtual ICollection<EmployeeDocs> EmployeeDocs { get; set; }
    }
}
