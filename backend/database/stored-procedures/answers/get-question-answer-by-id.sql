
CREATE OR ALTER PROCEDURE usp_GetQuestionAnswerById
    @questionId INT,
    @answerId INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT *
    FROM Answers
    WHERE questionId = @questionId AND id = @answerId
END