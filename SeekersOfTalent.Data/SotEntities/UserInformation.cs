using System;
using System.Collections.Generic;

namespace SeekersOfTalent.Data.SotEntities
{
    public partial class UserInformation
    {
        public UserInformation()
        {
            EducationHistory = new HashSet<EducationHistory>();
            EmployeeAvailability = new HashSet<EmployeeAvailability>();
            EmployeeDocs = new HashSet<EmployeeDocs>();
            EmployeePortfolio = new HashSet<EmployeePortfolio>();
            EmployeeSkill = new HashSet<EmployeeSkill>();
            EmploymentHistory = new HashSet<EmploymentHistory>();
        }

        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string DateOfBirth { get; set; }
        public int RoleId { get; set; }
        public Guid? ProfileImg { get; set; }
        public string Biography { get; set; }
        public string PhoneNumber { get; set; }

        public virtual RoleType Role { get; set; }
        public virtual ICollection<EducationHistory> EducationHistory { get; set; }
        public virtual ICollection<EmployeeAvailability> EmployeeAvailability { get; set; }
        public virtual ICollection<EmployeeDocs> EmployeeDocs { get; set; }
        public virtual ICollection<EmployeePortfolio> EmployeePortfolio { get; set; }
        public virtual ICollection<EmployeeSkill> EmployeeSkill { get; set; }
        public virtual ICollection<EmploymentHistory> EmploymentHistory { get; set; }
    }
}
