CREATE OR ALTER PROCEDURE usp_SoftDeleteQuestion
    @id INT
AS
BEGIN
    UPDATE Questions
    SET isDeleted = 1
    WHERE id = @id;
END



