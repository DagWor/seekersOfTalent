using System;
using System.Collections.Generic;

namespace SeekersOfTalent.Data.SotEntities
{
    public partial class EmployeeDocs
    {
        public Guid DocId { get; set; }
        public Guid EmployeeId { get; set; }

        public virtual Document Doc { get; set; }
        public virtual UserInformation Employee { get; set; }
    }
}
