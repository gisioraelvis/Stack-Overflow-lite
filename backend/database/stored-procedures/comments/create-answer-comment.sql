
CREATE OR ALTER PROCEDURE usp_CreateQuestionAnswerComment
    @answerId INT,
    @userId INT,
    @body VARCHAR(MAX)
AS
BEGIN
    INSERT INTO Comments
        (answerId, userId, body)
    VALUES
        (@answerId, @userId, @body)
    SELECT *
    FROM Comments
    WHERE id = SCOPE_IDENTITY()
END