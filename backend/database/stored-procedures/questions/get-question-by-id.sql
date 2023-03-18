CREATE OR ALTER PROCEDURE usp_GetQuestionById
    @id INT
AS
BEGIN
    SELECT *
    FROM Questions
    WHERE id = @id AND isDeleted = 0;
END