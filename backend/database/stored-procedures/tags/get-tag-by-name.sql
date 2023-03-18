CREATE OR ALTER PROCEDURE usp_GetTagByName
    @name VARCHAR(255)
AS
BEGIN
    SELECT id, name, body, createdAt, updatedAt
    FROM Tags
    WHERE name = @name
END
