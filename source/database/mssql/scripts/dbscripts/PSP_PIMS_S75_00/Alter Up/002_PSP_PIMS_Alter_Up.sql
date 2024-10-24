-- Script generated by Aqua Data Studio Schema Synchronization for MS SQL Server 2016 on Wed Feb 28 11:45:15 GMT-08:00 2024
-- Execute this script on:
-- 		PSP_PIMS_S74.00/dbo - This database/schema will be modified
-- to synchronize it with MS SQL Server 2016:
-- 		PSP_PIMS_S75.00/dbo

-- We recommend backing up the database prior to executing the script.

SET XACT_ABORT ON
GO
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE
GO
BEGIN TRANSACTION
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO

-- Alter table dbo.PIMS_PROPERTY_HIST
PRINT N'Alter table dbo.PIMS_PROPERTY_HIST'
GO
ALTER TABLE [dbo].[PIMS_PROPERTY_HIST] ALTER COLUMN [ZONING_POTENTIAL] nvarchar(100) NULL
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO

-- Alter table dbo.PIMS_PROPERTY
PRINT N'Alter table dbo.PIMS_PROPERTY'
GO
ALTER TABLE [dbo].[PIMS_PROPERTY] ALTER COLUMN [ZONING_POTENTIAL] nvarchar(100) NULL
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO

COMMIT TRANSACTION
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
DECLARE @Success AS BIT
SET @Success = 1
SET NOEXEC OFF
IF (@Success = 1) PRINT 'The database update succeeded'
ELSE BEGIN
   IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION
   PRINT 'The database update failed'
END
GO
