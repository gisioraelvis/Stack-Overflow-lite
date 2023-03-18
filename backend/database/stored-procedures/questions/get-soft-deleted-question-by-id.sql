CREATE OR ALTER PROCEDURE usp_GetSoftDeletedQuestionById
    @id INT
AS
BEGIN
    SELECT *
    FROM Questions
    WHERE id = @id AND isDeleted = 1;
END