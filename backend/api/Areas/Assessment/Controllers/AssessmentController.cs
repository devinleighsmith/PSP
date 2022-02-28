using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pims.Api.Policies;
using Pims.Dal.Security;
using Pims.Dal.Services;
using Swashbuckle.AspNetCore.Annotations;
using System.Collections.Generic;

namespace Pims.Api.Areas.Assessment.Controllers
{
    /// <summary>
    /// AssessmentController class, provides endpoints for interacting with BC Assessment data.
    /// </summary>
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Area("leases")]
    [Route("v{version:apiVersion}/[area]")]
    [Route("[area]")]
    public class AssessmentController : ControllerBase
    {
        #region Variables
        private readonly IPimsService _pimsService;
        private readonly IMapper _mapper;
        #endregion

        #region Constructors
        /// <summary>
        /// Creates a new instance of a AssessmentController class, initializes it with the specified arguments.
        /// </summary>
        /// <param name="pimsService"></param>
        /// <param name="mapper"></param>
        ///
        public AssessmentController(IPimsService pimsService, IMapper mapper)
        {
            _pimsService = pimsService;
            _mapper = mapper;
        }
        #endregion

        #region Endpoints
        /// <summary>
        /// Get the assessment for the specified primary key 'pid'.
        /// </summary>
        /// <returns></returns>
        [HttpGet("{id:long}")]
        [HasPermission(Permissions.AssessmentView)]
        [Produces("application/json")]
        [ProducesResponseType(typeof(IEnumerable<Models.Assessment.AssessmentModel>), 200)]
        [SwaggerOperation(Tags = new[] { "assessment" })]
        public IActionResult GetAssessment(int pid)
        {
            var assessment = _pimsService.AssessmentService.GetCivicAddressByPid(pid);

            return new JsonResult(_mapper.Map<Models.Assessment.AssessmentModel>(assessment));
        }
        #endregion
    }
}
