using System;
using System.Collections.Generic;
using System.Text;

namespace SeekersOfTalent.Types
{
    public class UserSession
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

    }
}
