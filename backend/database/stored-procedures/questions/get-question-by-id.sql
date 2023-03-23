/* CREATE OR ALTER PROCEDURE usp_GetQuestionById
    @id INT
AS
BEGIN
    SELECT q.id AS questionId, q.userId AS questionUserId, q.title AS questionTitle, q.body AS questionBody, q.upvotes AS questionUpvotes, q.downvotes AS questionDownvotes, q.isDeleted AS questionIsDeleted, q.createdAt AS questionCreatedAt, q.updatedAt AS questionUpdatedAt,
        u.id AS userId, u.name AS userName, u.email AS userEmail, u.avatar AS userAvatar, u.bio AS userBio, u.isAdmin AS userIsAdmin, u.isDeleted AS userIsDeleted, u.createdAt AS userCreatedAt, u.updatedAt AS userUpdatedAt,
        t.id AS tagId, t.userId AS tagUserId, t.name AS tagName, t.body AS tagBody, t.createdAt AS tagCreatedAt, t.updatedAt AS tagUpdatedAt,
        a.id AS answerId, a.userId AS answerUserId, a.questionId AS answerQuestionId, a.body AS answerBody, a.upvotes AS answerUpvotes, a.downvotes AS answerDownvotes, a.isAccepted AS answerIsAccepted, a.isDeleted AS answerIsDeleted, a.createdAt AS answerCreatedAt, a.updatedAt AS answerUpdatedAt,
        c.id AS commentId, c.userId AS commentUserId, c.questionId AS commentQuestionId, c.answerId AS commentAnswerId, c.body AS commentBody, c.isDeleted AS commentIsDeleted, c.createdAt AS commentCreatedAt, c.updatedAt AS commentUpdatedAt
    FROM Questions q
        JOIN Users u ON q.userId = u.id
        LEFT JOIN QuestionTags qt ON q.id = qt.questionId
        LEFT JOIN Tags t ON qt.tagId = t.id
        LEFT JOIN Answers a ON q.id = a.questionId
        LEFT JOIN Comments c ON q.id = c.questionId OR a.id = c.answerId
    WHERE q.id = @id AND q.isDeleted = 0
    ORDER BY q.id
END */
CREATE OR ALTER PROCEDURE usp_GetQuestionById
    @id INT
AS
BEGIN
    SELECT MAX(q.id) AS questionId, q.userId AS questionUserId, q.title AS questionTitle, q.body AS questionBody, q.upvotes AS questionUpvotes, q.downvotes AS questionDownvotes, COUNT(a.id) AS questionTotalAnswers, q.isDeleted AS questionIsDeleted, q.createdAt AS questionCreatedAt, q.updatedAt AS questionUpdatedAt,
        u.id AS userId, u.name AS userName, u.email AS userEmail, u.avatar AS userAvatar, u.bio AS userBio, u.isAdmin AS userIsAdmin, u.isDeleted AS userIsDeleted, u.createdAt AS userCreatedAt, u.updatedAt AS userUpdatedAt,
        t.id AS tagId, t.userId AS tagUserId, t.name AS tagName, t.body AS tagBody, t.createdAt AS tagCreatedAt, t.updatedAt AS tagUpdatedAt,
        a.id AS answerId, a.userId AS answerUserId, a.questionId AS answerQuestionId, a.body AS answerBody, a.upvotes AS answerUpvotes, a.downvotes AS answerDownvotes, a.isAccepted AS answerIsAccepted, a.isDeleted AS answerIsDeleted, a.createdAt AS answerCreatedAt, a.updatedAt AS answerUpdatedAt,
        c.id AS commentId, c.userId AS commentUserId, c.questionId AS commentQuestionId, c.answerId AS commentAnswerId, c.body AS commentBody, c.isDeleted AS commentIsDeleted, c.createdAt AS commentCreatedAt, c.updatedAt AS commentUpdatedAt
    FROM Questions q
        JOIN Users u ON q.userId = u.id
        LEFT JOIN QuestionTags qt ON q.id = qt.questionId
        LEFT JOIN Tags t ON qt.tagId = t.id
        LEFT JOIN Answers a ON q.id = a.questionId
        LEFT JOIN Comments c ON q.id = c.questionId OR a.id = c.answerId
    WHERE q.id = @id AND q.isDeleted = 0
    GROUP BY q.userId, q.title, q.body, q.upvotes, q.downvotes, q.isDeleted, q.createdAt, q.updatedAt,
        u.id, u.name, u.email, u.avatar, u.bio, u.isAdmin, u.isDeleted, u.createdAt, u.updatedAt,
        t.id, t.userId, t.name, t.body, t.createdAt, t.updatedAt,
        a.id, a.userId, a.questionId, a.body, a.upvotes, a.downvotes, a.isAccepted, a.isDeleted, a.createdAt, a.updatedAt,
        c.id, c.userId, c.questionId, c.answerId, c.body, c.isDeleted, c.createdAt, c.updatedAt
    ORDER BY questionId
END