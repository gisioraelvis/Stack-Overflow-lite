CREATE OR ALTER PROCEDURE usp_CreateQuestion
    @userId INT,
    @title VARCHAR(255),
    @body VARCHAR(MAX)
AS
BEGIN
    DECLARE @questionId INT;
    DECLARE @tagId INT;
    DECLARE @tagIdList TABLE (id INT);

    INSERT INTO Questions
        (userId, title, body)
    VALUES
        (@userId, @title, @body);

    SET @questionId = SCOPE_IDENTITY();

    SELECT q.id AS questionId, q.userId AS questionUserId, q.title AS questionTitle, q.body AS questionBody, q.upvotes AS questionUpvotes, q.downvotes AS questionDownvotes, q.isDeleted AS questionIsDeleted, q.createdAt AS questionCreatedAt, q.updatedAt AS questionUpdatedAt,
        u.id AS userId, u.name AS userName, u.email AS userEmail, u.avatar AS userAvatar, u.bio AS userBio, u.isAdmin AS userIsAdmin, u.isDeleted AS userIsDeleted, u.createdAt AS userCreatedAt, u.updatedAt AS userUpdatedAt
    FROM Questions q
        JOIN Users u ON q.userId = u.id
    WHERE q.id = @questionId;
END

