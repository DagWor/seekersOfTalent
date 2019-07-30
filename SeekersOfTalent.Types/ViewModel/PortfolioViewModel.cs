using System;
using System.Collections.Generic;

namespace SeekersOfTalent.Types.ViewModel
{
    public class PortfolioViewModel
    {
        public PortfolioViewModel()
        {
            Projects = new List<Project>();
        }
        public int Id { get; set; }
        public Guid? EmployeeId { get; set; }
        public List<Project> Projects { get; set; }
    }
    public class Project
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Links { get; set; }
    }
}
