CREATE OR ALTER PROCEDURE usp_GetQuestionByAnswerId
    @answerId INT
AS
BEGIN
    SELECT q.id, q.userId, q.title, q.body, q.upvotes, q.downvotes, q.isDeleted, q.createdAt, q.updatedAt
    FROM Questions q
    INNER JOIN Answers a ON a.questionId = q.id
    WHERE a.id = @answerId
END