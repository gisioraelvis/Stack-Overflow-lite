CREATE OR ALTER PROCEDURE usp_GetQuestionAnswers
    @id INT
AS
BEGIN
    SELECT a.id AS answerId, a.userId AS answerUserId, a.questionId AS answerQuestionId, a.body AS answerBody, a.upvotes AS answerUpvotes, a.downvotes AS answerDownvotes, a.isAccepted AS answerIsAccepted, a.isDeleted AS answerIsDeleted, a.createdAt AS answerCreatedAt, a.updatedAt AS answerUpdatedAt,
        u.id AS userId, u.name AS userName, u.email AS userEmail, u.avatar AS userAvatar, u.bio AS userBio, u.isAdmin AS userIsAdmin, u.isDeleted AS userIsDeleted, u.createdAt AS userCreatedAt, u.updatedAt AS userUpdatedAt
    FROM Answers a
        JOIN Users u ON a.userId = u.id
    WHERE a.questionId = @id AND a.isDeleted = 0
    ORDER BY a.id
END