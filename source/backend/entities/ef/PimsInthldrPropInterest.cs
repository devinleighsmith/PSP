﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Pims.Dal.Entities
{
    [Table("PIMS_INTHLDR_PROP_INTEREST")]
    [Index(nameof(InterestHolderId), Name = "IHPRIN_INTEREST_HOLDER_ID_IDX")]
    [Index(nameof(InterestHolderInterestTypeCode), Name = "IHPRIN_INTEREST_HOLDER_INTEREST_TYPE_CODE_IDX")]
    [Index(nameof(PropertyAcquisitionFileId), Name = "IHPRIN_PROPERTY_ACQUISITION_FILE_ID_IDX")]
    public partial class PimsInthldrPropInterest
    {
        [Key]
        [Column("PIMS_INTHLDR_PROP_INTEREST_ID")]
        public long PimsInthldrPropInterestId { get; set; }
        [Column("INTEREST_HOLDER_ID")]
        public long InterestHolderId { get; set; }
        [Column("PROPERTY_ACQUISITION_FILE_ID")]
        public long? PropertyAcquisitionFileId { get; set; }
        [Required]
        [Column("INTEREST_HOLDER_INTEREST_TYPE_CODE")]
        [StringLength(20)]
        public string InterestHolderInterestTypeCode { get; set; }
        [Column("IS_DISABLED")]
        public bool? IsDisabled { get; set; }
        [Column("CONCURRENCY_CONTROL_NUMBER")]
        public long ConcurrencyControlNumber { get; set; }
        [Column("APP_CREATE_TIMESTAMP", TypeName = "datetime")]
        public DateTime AppCreateTimestamp { get; set; }
        [Required]
        [Column("APP_CREATE_USERID")]
        [StringLength(30)]
        public string AppCreateUserid { get; set; }
        [Column("APP_CREATE_USER_GUID")]
        public Guid? AppCreateUserGuid { get; set; }
        [Required]
        [Column("APP_CREATE_USER_DIRECTORY")]
        [StringLength(30)]
        public string AppCreateUserDirectory { get; set; }
        [Column("APP_LAST_UPDATE_TIMESTAMP", TypeName = "datetime")]
        public DateTime AppLastUpdateTimestamp { get; set; }
        [Required]
        [Column("APP_LAST_UPDATE_USERID")]
        [StringLength(30)]
        public string AppLastUpdateUserid { get; set; }
        [Column("APP_LAST_UPDATE_USER_GUID")]
        public Guid? AppLastUpdateUserGuid { get; set; }
        [Required]
        [Column("APP_LAST_UPDATE_USER_DIRECTORY")]
        [StringLength(30)]
        public string AppLastUpdateUserDirectory { get; set; }
        [Column("DB_CREATE_TIMESTAMP", TypeName = "datetime")]
        public DateTime DbCreateTimestamp { get; set; }
        [Required]
        [Column("DB_CREATE_USERID")]
        [StringLength(30)]
        public string DbCreateUserid { get; set; }
        [Column("DB_LAST_UPDATE_TIMESTAMP", TypeName = "datetime")]
        public DateTime DbLastUpdateTimestamp { get; set; }
        [Required]
        [Column("DB_LAST_UPDATE_USERID")]
        [StringLength(30)]
        public string DbLastUpdateUserid { get; set; }

        [ForeignKey(nameof(InterestHolderId))]
        [InverseProperty(nameof(PimsInterestHolder.PimsInthldrPropInterests))]
        public virtual PimsInterestHolder InterestHolder { get; set; }
        [ForeignKey(nameof(InterestHolderInterestTypeCode))]
        [InverseProperty(nameof(PimsInterestHolderInterestType.PimsInthldrPropInterests))]
        public virtual PimsInterestHolderInterestType InterestHolderInterestTypeCodeNavigation { get; set; }
        [ForeignKey(nameof(PropertyAcquisitionFileId))]
        [InverseProperty(nameof(PimsPropertyAcquisitionFile.PimsInthldrPropInterests))]
        public virtual PimsPropertyAcquisitionFile PropertyAcquisitionFile { get; set; }
    }
}