CREATE OR ALTER PROCEDURE usp_GetTagByName
    @name VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM Tags
    WHERE name = @name
END
