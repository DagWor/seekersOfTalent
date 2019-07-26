using System;
using System.Collections.Generic;

namespace SeekersOfTalent.Data.SotEntities
{
    public partial class EmployeeAvailability
    {
        public int Id { get; set; }
        public Guid EmployeeId { get; set; }
        public bool Available { get; set; }
        public string Reason { get; set; }

        public virtual UserInformation Employee { get; set; }
    }
}
