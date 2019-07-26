using System;
using System.Collections.Generic;

namespace SeekersOfTalent.Data.SotEntities
{
    public partial class EmploymentHistory
    {
        public int Id { get; set; }
        public Guid EmployeeId { get; set; }
        public string Position { get; set; }
        public string Description { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }

        public virtual UserInformation Employee { get; set; }
    }
}
