CREATE OR ALTER PROCEDURE usp_RestoreQuestion
    @id INT
AS
BEGIN
    UPDATE Questions
    SET isDeleted = 0
    WHERE id = @id;
END