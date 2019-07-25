using System;
using System.Collections.Generic;
using System.Text;

namespace SeekersOfTalent.Types.ViewModel
{
    public class PortfolioViewModel
    {
        public PortfolioViewModel()
        {
            Projects = new List<Project>();
        }
        public int Id { get; set; }
        public Guid EmployeeId { get; set; }
        public List<Project> Projects { get; set; }
    }
    public class Project
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<string> Links { get; set; }
    }
}
