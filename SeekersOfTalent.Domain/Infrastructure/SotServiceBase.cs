using SeekersOfTalent.Data.SotEntities;
using SeekersOfTalent.Types;
using SeekersOfTalent.Types.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SeekersOfTalent.Domain.Infrastructure
{
    public class SotServiceBase : IDocumentServiceBase
    {
        public SotContext Context { get; set; }
        public UserSession Session { get; set; }

        public void SetContext(SotContext _context) => Context = _context;
        public void SetSession(UserSession session) => Session = session;
        public void PassContext(SotServiceBase _base, SotContext _context) => _base.SetContext(_context);
        protected UserProfileResponse GetUserProfileById(Guid userId)
        {
            var user = Context.UserInformation.Find(userId);
            if (user == null)
                throw new Exception("User Not Found!");
            UserProfileResponse userResponse = new UserProfileResponse
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                BirthDate = user.DateOfBirth,
                ProfilePicture = user.ProfileImg == null ? null : GetDocumentResponseById((Guid)user.ProfileImg),
                Role = (Types.Constants.RoleType)user.RoleId,
            };

            if (userResponse.Role == Types.Constants.RoleType.EMPLOYEE)
            {
                userResponse.Bio = user.Biography;
                GetEmployeeSpesificInfo(userResponse);
            }

            return userResponse;
        }

        private void GetEmployeeSpesificInfo(UserProfileResponse userResponse)
        {
            userResponse.AvailablityInfo = GetAvailabilityInfo((Guid)userResponse.Id);
            userResponse.EducationHistory = GetEducationHistory((Guid)userResponse.Id);
            userResponse.EmployementHistory = GetEmploymentHistory((Guid)userResponse.Id);
            userResponse.OtherDocs = GetEmployeeDocs((Guid)userResponse.Id);
            userResponse.Portfolio = GetEmployeePortFolio((Guid)userResponse.Id);
            userResponse.Skills = GetEmployeeSkillSet((Guid)userResponse.Id);
        }

        private List<SkillViewModel> GetEmployeeSkillSet(Guid id)
        {
            List<SkillViewModel> empSkillResponse = new List<SkillViewModel>();
            var empSkl = Context.EmployeeSkill.Where(eh => eh.EmployeeId == id).ToList();
            empSkl.ForEach(eSkl =>
            {
                empSkillResponse.Add(new SkillViewModel
                {
                    Id = eSkl.SkillId,
                    Name = eSkl.Skill.Name,
                    Description = eSkl.Skill.Description,
                    LevelOfExpertise = new Expertise
                    {
                        Id = Context.ExpertiseLvlType.Find(eSkl.ExpertiseLvlId).Id,
                        Name = Context.ExpertiseLvlType.Find(eSkl.ExpertiseLvlId)?.Name
                    }
                });
            });
            return empSkillResponse;

        }

        private List<DocumentResponse> GetEmployeeDocs(Guid id)
        {
            List<DocumentResponse> docResponse = new List<DocumentResponse>();
            var docs = Context.EmployeeDocs.Where(ed => ed.EmployeeId == id).ToList();
            docs.ForEach(doc =>
            {
                docResponse.Add(GetDocumentResponseById(doc.DocId));
            });
            return docResponse;
        }

        private List<EmploymentViewModel> GetEmploymentHistory(Guid id)
        {
            List<EmploymentViewModel> empHistoryResponse = new List<EmploymentViewModel>();
            var empHis = Context.EmploymentHistory.Where(eh => eh.EmployeeId == id).ToList();
            empHis.ForEach(eh =>
            {
                empHistoryResponse.Add(new EmploymentViewModel
                {
                    Id = eh.Id,
                    EndDate = eh.EndDate,
                    JobDescription = eh.Description,
                    Position = eh.Position,
                    StartDate = eh.StartDate
                });
            });
            return empHistoryResponse;
        }

        private List<EducationViewModel> GetEducationHistory(Guid id)
        {
            List<EducationViewModel> educHistoryResponse = new List<EducationViewModel>();
            var educHis = Context.EducationHistory.Where(eh => eh.EmployeeId == id).ToList();
            educHis.ForEach(eh =>
            {
                educHistoryResponse.Add(new EducationViewModel
                {
                    Id = eh.Id,
                    EndDate = eh.EndDate,
                    Description = eh.Description,
                    FieldOfStudy = eh.Field,
                    StartDate = eh.StartDate
                });
            });
            return educHistoryResponse;
        }

        private AvailabilityViewModel GetAvailabilityInfo(Guid id)
        {
            var avm = Context.EmployeeAvailability.FirstOrDefault(ea => ea.EmployeeId == id);
            return avm == null
                ?
                null
                :
                new AvailabilityViewModel
                {
                    Id = avm.Id,
                    IsAvailable = avm.Available,
                    Explanation = avm.Reason
                };
        }

        private PortfolioViewModel GetEmployeePortFolio(Guid userId)
        {
            var prtf = Context.EmployeePortfolio.FirstOrDefault(p => p.EmployeeId == userId);
            return prtf == null
                ?
                null
                :
                new PortfolioViewModel
                {
                    Id = prtf.Id,
                    EmployeeId = prtf.EmployeeId,
                    Projects = DeserializeObjectFromJson<List<Project>>(prtf.Projects)
                };
        }

        protected UserProfileResponse UpdateUserInformation(UserProfileRequest request)
        {
            return GetUserProfileById(Guid.NewGuid());
        }



        #region Document Services

        public DocumentResponse CreateDocument(DocumentRequest requst)
        {
            Document doc = new Document
            {
                Id = Guid.NewGuid(),
                DateUploaded = DateTime.Now,
                File = Convert.FromBase64String(requst.File),
                Filename = requst.FileName,
                Mimetype = requst.MimeType,
            };
            Context.Document.Add(doc);
            Context.SaveChanges();
            return GetDocumentResponseById(doc.Id);
        }

        public DocumentResponse GetDocumentResponseById(Guid docId)
        {
            var doc = Context.Document.Find(docId);
            if (doc == null)
                return null;
            DocumentResponse response = new DocumentResponse
            {
                Id = doc.Id,
                DateUploaded = doc.DateUploaded,
                FileName = doc.Filename,
                MimeType = doc.Mimetype
            };
            return response;
        }

        public DocumentRequest GetDocumentById(Guid docId)
        {
            var document = Context.Document.Find(docId);
            return document == null
                ?
                null
                :
                new DocumentRequest
                {
                    FileName = document.Filename,
                    Id = document.Id,
                    MimeType = document.Mimetype,
                    File = Convert.ToBase64String(document.File)
                };
        }


        public Document GetByteDocumentById(Guid docId)
        {
            var document = Context.Document.Find(docId);
            return document;
        }
        #endregion


        protected string SerializeObjectToJson(object obj) => Newtonsoft.Json.JsonConvert.SerializeObject(obj);
        protected T DeserializeObjectFromJson<T>(string data) => Newtonsoft.Json.JsonConvert.DeserializeObject<T>(data);
    }
}
