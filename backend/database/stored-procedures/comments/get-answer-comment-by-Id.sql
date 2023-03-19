CREATE OR ALTER PROCEDURE usp_GetQuestionAnswerCommentById
    @answerId INT,
    @commentId INT
AS
BEGIN
    SELECT *
    FROM Comments
    WHERE id = @commentId AND answerId = @answerId
END