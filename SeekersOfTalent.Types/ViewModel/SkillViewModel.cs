namespace SeekersOfTalent.Types.ViewModel
{
    public class SkillViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public Expertise LevelOfExpertise { get; set; }

    }

    public class Expertise
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
