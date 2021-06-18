PRINT 'Adding MotiRegions'

INSERT INTO dbo.[MotiRegions] (
    [Id]
    , [IsVisible]
    , [Name]
    , [IsDisabled]
    , [SortOrder]
) VALUES
(
    0 
    , 1
    , 'Southern Interior'
    , 0
    , 1
),
(
    1 
    , 1
    , 'Northern'
    , 0
    , 2
),
(
    2 
    , 1
    , 'South Coast'
    , 0
    , 3
)
