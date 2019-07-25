using System;
using System.Collections.Generic;
using System.Text;

namespace SeekersOfTalent.Types.ViewModel
{
    public class EducationViewModel
    {
        public int Id { get; set; }
        public string FieldOfStudy { get; set; }
        public string Description { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
    }
}
