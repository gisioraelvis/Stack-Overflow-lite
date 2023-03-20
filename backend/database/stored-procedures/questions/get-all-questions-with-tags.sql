CREATE OR ALTER PROCEDURE usp_GetAllQuestionsWithTags
AS
BEGIN
    SELECT q.id AS questionId, q.userId AS questionUserId, q.title AS questionTitle, q.body AS questionBody, q.upvotes AS questionUpvotes, q.downvotes AS questionDownvotes, q.isDeleted AS questionIsDeleted, q.createdAt AS questionCreatedAt, q.updatedAt AS questionUpdatedAt,
        u.id AS userId, u.name AS userName, u.email AS userEmail, u.avatar AS userAvatar, u.bio AS userBio, u.isAdmin AS userIsAdmin, u.isDeleted AS userIsDeleted, u.createdAt AS userCreatedAt, u.updatedAt AS userUpdatedAt,
        t.id AS tagId, t.userId AS tagUserId, t.name AS tagName, t.body AS tagBody, t.createdAt AS tagCreatedAt, t.updatedAt AS tagUpdatedAt
    FROM Questions q
        JOIN Users u ON q.userId = u.id
        LEFT JOIN QuestionTags qt ON q.id = qt.questionId
        LEFT JOIN Tags t ON qt.tagId = t.id
    WHERE q.isDeleted = 0
    ORDER BY q.id
END