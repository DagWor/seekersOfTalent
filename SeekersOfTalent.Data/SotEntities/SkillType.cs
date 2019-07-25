using System;
using System.Collections.Generic;

namespace SeekersOfTalent.Data.SotEntities
{
    public partial class SkillType
    {
        public SkillType()
        {
            EmployeeSkill = new HashSet<EmployeeSkill>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<EmployeeSkill> EmployeeSkill { get; set; }
    }
}
