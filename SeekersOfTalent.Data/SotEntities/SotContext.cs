using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SeekersOfTalent.Data.SotEntities
{
    public partial class SotContext : DbContext
    {
        public SotContext()
        {
        }

        public SotContext(DbContextOptions<SotContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Document> Document { get; set; }
        public virtual DbSet<EducationHistory> EducationHistory { get; set; }
        public virtual DbSet<EmployeeAvailability> EmployeeAvailability { get; set; }
        public virtual DbSet<EmployeePortfolio> EmployeePortfolio { get; set; }
        public virtual DbSet<EmployeeSkill> EmployeeSkill { get; set; }
        public virtual DbSet<ExpertiseLvlType> ExpertiseLvlType { get; set; }
        public virtual DbSet<JobHistory> JobHistory { get; set; }
        public virtual DbSet<RoleType> RoleType { get; set; }
        public virtual DbSet<SkillType> SkillType { get; set; }
        public virtual DbSet<UserInformation> UserInformation { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseNpgsql("Server=localhost;Database=sot;Username=postgres;Password=admin");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Document>(entity =>
            {
                entity.ToTable("document", "doc");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.DateUploaded)
                    .HasColumnName("date_uploaded")
                    .HasColumnType("date");

                entity.Property(e => e.File)
                    .IsRequired()
                    .HasColumnName("file");

                entity.Property(e => e.Filename)
                    .IsRequired()
                    .HasColumnName("filename")
                    .HasMaxLength(500);

                entity.Property(e => e.Mimetype)
                    .IsRequired()
                    .HasColumnName("mimetype")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<EducationHistory>(entity =>
            {
                entity.ToTable("education_history", "lb");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('lb.education_history_id_seq'::regclass)");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.EmployeeId).HasColumnName("employee_id");

                entity.Property(e => e.EndDate)
                    .IsRequired()
                    .HasColumnName("end_date")
                    .HasMaxLength(20);

                entity.Property(e => e.Field)
                    .IsRequired()
                    .HasColumnName("field")
                    .HasMaxLength(50);

                entity.Property(e => e.StartDate)
                    .IsRequired()
                    .HasColumnName("start_date")
                    .HasMaxLength(20);

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.EducationHistory)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("education_history_user_information_id_fk");
            });

            modelBuilder.Entity<EmployeeAvailability>(entity =>
            {
                entity.ToTable("employee_availability", "lb");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('lb.employee_availability_id_seq'::regclass)");

                entity.Property(e => e.Available).HasColumnName("available");

                entity.Property(e => e.EmployeeId).HasColumnName("employee_id");

                entity.Property(e => e.Reason).HasColumnName("reason");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.EmployeeAvailability)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("employee_availability_user_information_id_fk");
            });

            modelBuilder.Entity<EmployeePortfolio>(entity =>
            {
                entity.ToTable("employee_portfolio", "lb");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('lb.employee_portfolio_id_seq'::regclass)");

                entity.Property(e => e.EmployeeId).HasColumnName("employee_id");

                entity.Property(e => e.Projects)
                    .IsRequired()
                    .HasColumnName("projects")
                    .HasColumnType("json");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.EmployeePortfolio)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("employee_portfolio_user_information_id_fk");
            });

            modelBuilder.Entity<EmployeeSkill>(entity =>
            {
                entity.HasKey(e => new { e.SkillId, e.EmployeeId })
                    .HasName("employee_skill_pk");

                entity.ToTable("employee_skill", "lb");

                entity.Property(e => e.SkillId).HasColumnName("skill_id");

                entity.Property(e => e.EmployeeId).HasColumnName("employee_id");

                entity.Property(e => e.ExpertiseLvlId).HasColumnName("expertise_lvl_id");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.EmployeeSkill)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("employee_skill_user_information_id_fk");

                entity.HasOne(d => d.ExpertiseLvl)
                    .WithMany(p => p.EmployeeSkill)
                    .HasForeignKey(d => d.ExpertiseLvlId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("employee_skill_expertise_lvl_type_id_fk");

                entity.HasOne(d => d.Skill)
                    .WithMany(p => p.EmployeeSkill)
                    .HasForeignKey(d => d.SkillId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("employee_skill_skill_type_id_fk");
            });

            modelBuilder.Entity<ExpertiseLvlType>(entity =>
            {
                entity.ToTable("expertise_lvl_type", "types");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<JobHistory>(entity =>
            {
                entity.ToTable("job_history", "lb");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('lb.job_history_id_seq'::regclass)");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.EmployeeId).HasColumnName("employee_id");

                entity.Property(e => e.EndDate)
                    .IsRequired()
                    .HasColumnName("end-date")
                    .HasMaxLength(20);

                entity.Property(e => e.Position)
                    .IsRequired()
                    .HasColumnName("position")
                    .HasMaxLength(50);

                entity.Property(e => e.StartDate)
                    .IsRequired()
                    .HasColumnName("start-date")
                    .HasMaxLength(20);

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.JobHistory)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("job_history_user_information_id_fk");
            });

            modelBuilder.Entity<RoleType>(entity =>
            {
                entity.ToTable("role_type", "types");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<SkillType>(entity =>
            {
                entity.ToTable("skill_type", "types");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<UserInformation>(entity =>
            {
                entity.ToTable("user_information", "lb");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Biography).HasColumnName("biography");

                entity.Property(e => e.DateOfBirth)
                    .HasColumnName("date_of_birth")
                    .HasColumnType("date");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(100);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnName("first_name")
                    .HasMaxLength(50);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasColumnName("last_name")
                    .HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password");

                entity.Property(e => e.ProfileImg).HasColumnName("profile_img");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.UserInformation)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("user_information_role_type_id_fk");
            });

            modelBuilder.HasSequence<int>("education_history_id_seq");

            modelBuilder.HasSequence<int>("employee_availability_id_seq");

            modelBuilder.HasSequence<int>("employee_portfolio_id_seq");

            modelBuilder.HasSequence<int>("job_history_id_seq");
        }
    }
}
