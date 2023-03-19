CREATE OR ALTER PROCEDURE usp_CreateQuestionComment
    @questionId INT,
    @userId INT,
    @body VARCHAR(MAX)
AS
BEGIN
    INSERT INTO Comments
        (questionId, userId, body)
    VALUES
        (@questionId, @userId, @body)
    SELECT *
    FROM Comments
    WHERE id = SCOPE_IDENTITY()
END