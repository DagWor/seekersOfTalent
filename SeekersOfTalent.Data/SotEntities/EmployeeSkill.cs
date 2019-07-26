using System;
using System.Collections.Generic;

namespace SeekersOfTalent.Data.SotEntities
{
    public partial class EmployeeSkill
    {
        public int SkillId { get; set; }
        public Guid EmployeeId { get; set; }
        public int ExpertiseLvlId { get; set; }

        public virtual UserInformation Employee { get; set; }
        public virtual ExpertiseLvlType ExpertiseLvl { get; set; }
        public virtual SkillType Skill { get; set; }
    }
}
