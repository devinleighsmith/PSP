using System.Security.Claims;
using Microsoft.Extensions.Logging;
using Pims.Api.Models.Lookup;
using Pims.Dal.Entities;
using Pims.Dal.Repositories;

namespace Pims.Api.Services
{
    public class FormService : BaseService, IFormService
    {
        private readonly ILogger _logger;
        private readonly IAcquisitionFileFormRepository _acquisitionFileFormRepository;

        public FormService(
            ClaimsPrincipal user,
            ILogger<ActivityService> logger,
            IAcquisitionFileFormRepository acquisitionFileFormRepository)
            : base(user, logger)
        {
            _logger = logger;
            _acquisitionFileFormRepository = acquisitionFileFormRepository;
        }

        public PimsAcquisitionFileForm AddAcquisitionForm(LookupModel<string> formType, long acquisitionFileId)
        {
            _logger.LogInformation("Adding acquisition form ...");
            var createdFileForm = _acquisitionFileFormRepository.Add(new PimsAcquisitionFileForm() { AcquisitionFileId = acquisitionFileId, FormTypeCode = formType.Id });
            _acquisitionFileFormRepository.CommitTransaction();
            return createdFileForm;
        }
    }
}
