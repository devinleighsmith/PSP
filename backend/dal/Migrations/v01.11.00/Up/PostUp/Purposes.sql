PRINT 'Adding Purpose'

INSERT INTO dbo.[Purposes] (
    [Id]
    , [IsVisible]
    , [Name]
    , [IsDisabled]
    , [SortOrder]
) VALUES
(
    0 
    , 1
    , 'Partial Acquisition'
    , 0
    , 1
),
(
    1 
    , 1
    , 'Total Acquisition'
    , 0
    , 2
),
(
    2 
    , 1
    , 'Licenses, Leases, and Statutory'' Rights-of-way [SRW]'
    , 0
    , 3
),
(
    3 
    , 1
    , 'Licenses'
    , 0
    , 4
),
(
    4 
    , 1
    , 'Leases'
    , 0
    , 5
),
(
    5 
    , 1
    , 'Stockpile License'
    , 0
    , 6
),
(
    6 
    , 1
    , 'Slope License'
    , 0
    , 7
),
(
    7 
    , 1
    , 'License for Construction'
    , 0
    , 8
),
(
    8 
    , 1
    , 'Gravel Pit Leases'
    , 0
    , 9
),
(
    9 
    , 1
    , 'Other Leases'
    , 0
    , 10
),
(
    10 
    , 1
    , 'Statutory Rights-of-Way'
    , 0
    , 11
)
