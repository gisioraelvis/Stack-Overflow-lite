CREATE OR ALTER PROCEDURE usp_CreateQuestionAnswer
    @questionId INT,
    @userId INT,
    @body VARCHAR(MAX)
AS
BEGIN
    INSERT INTO Answers
        (questionId, userId, body)
    VALUES
        (@questionId, @userId, @body)
    SELECT *
    FROM Answers
    WHERE id = SCOPE_IDENTITY()
END