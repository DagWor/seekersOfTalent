using System;
using System.Collections.Generic;

namespace SeekersOfTalent.Data.SotEntities
{
    public partial class RoleType
    {
        public RoleType()
        {
            UserInformation = new HashSet<UserInformation>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<UserInformation> UserInformation { get; set; }
    }
}
