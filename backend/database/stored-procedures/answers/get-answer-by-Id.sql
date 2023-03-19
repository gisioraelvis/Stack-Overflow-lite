CREATE OR ALTER PROCEDURE usp_GetAnswerById
    @id INT
AS
BEGIN
    SELECT *
    FROM Answers
    WHERE id = @id
END