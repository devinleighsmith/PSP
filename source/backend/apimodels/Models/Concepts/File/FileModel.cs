using Pims.Api.Models.Base;

namespace Pims.Api.Models.Concepts.File
{
    public class FileModel : BaseAuditModel
    {
        #region Properties

        /// <summary>
        /// get/set - The model id.
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// get/set - The file name.
        /// </summary>
        public string FileName { get; set; }

        /// <summary>
        /// get/set - The File number.
        /// </summary>
        public string FileNumber { get; set; }

        /// <summary>
        /// get/set - The file status type.
        /// </summary>
        public TypeModel<string> FileStatusTypeCode { get; set; }

        #endregion
    }
}