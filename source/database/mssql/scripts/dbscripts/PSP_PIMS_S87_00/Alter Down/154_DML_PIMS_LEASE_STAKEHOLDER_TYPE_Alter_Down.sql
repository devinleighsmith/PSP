IF EXISTS (
    SELECT
        1
    FROM
        PIMS_LEASE_STAKEHOLDER_TYPE
    WHERE
        LEASE_STAKEHOLDER_TYPE_CODE = 'OWNER'
) BEGIN
UPDATE
    PIMS_LEASE_STAKEHOLDER_TYPE
SET
    IS_DISABLED = 1,
    CONCURRENCY_CONTROL_NUMBER = CONCURRENCY_CONTROL_NUMBER + 1
WHERE
    LEASE_STAKEHOLDER_TYPE_CODE = 'OWNER';

END;

IF EXISTS (
    SELECT
        1
    FROM
        PIMS_LEASE_STAKEHOLDER_TYPE
    WHERE
        LEASE_STAKEHOLDER_TYPE_CODE = 'OWNREP'
) BEGIN
UPDATE
    PIMS_LEASE_STAKEHOLDER_TYPE
SET
    IS_DISABLED = 1,
    CONCURRENCY_CONTROL_NUMBER = CONCURRENCY_CONTROL_NUMBER + 1
WHERE
    LEASE_STAKEHOLDER_TYPE_CODE = 'OWNREP';

END;

GO