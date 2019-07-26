using SeekersOfTalent.Types.Constants;
using System;

namespace SeekersOfTalent.Types
{
    public class UserSession
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string PhoneNumber { get; set; }
        public RoleType Role { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

    }
}
