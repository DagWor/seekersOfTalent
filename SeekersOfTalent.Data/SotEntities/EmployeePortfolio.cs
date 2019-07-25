using System;
using System.Collections.Generic;

namespace SeekersOfTalent.Data.SotEntities
{
    public partial class EmployeePortfolio
    {
        public int Id { get; set; }
        public Guid EmployeeId { get; set; }
        public string Projects { get; set; }

        public virtual UserInformation Employee { get; set; }
    }
}
