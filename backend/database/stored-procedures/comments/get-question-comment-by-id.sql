CREATE OR ALTER PROCEDURE usp_GetQuestionCommentById
    @questionId INT,
    @commentId INT
AS
BEGIN
    SELECT *
    FROM Comments
    WHERE id = @commentId AND questionId = @questionId
END