CREATE OR ALTER PROCEDURE usp_GetTagById
    @id INT
AS
BEGIN
    SELECT *
    FROM Tags
    WHERE id = @id;
END