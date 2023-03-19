CREATE OR ALTER PROCEDURE usp_GetQuestionComments
    @id INT
AS
BEGIN
    SELECT c.id AS commentId, c.userId AS commentUserId, c.questionId AS commentQuestionId, c.answerId AS commentAnswerId, c.body AS commentBody, c.isDeleted AS commentIsDeleted, c.createdAt AS commentCreatedAt, c.updatedAt AS commentUpdatedAt,
        u.id AS userId, u.name AS userName, u.email AS userEmail, u.avatar AS userAvatar, u.bio AS userBio, u.isAdmin AS userIsAdmin, u.isDeleted AS userIsDeleted, u.createdAt AS userCreatedAt, u.updatedAt AS userUpdatedAt
    FROM Comments c
        JOIN Users u ON c.userId = u.id
    WHERE c.questionId = @id AND c.isDeleted = 0
    ORDER BY c.id
END