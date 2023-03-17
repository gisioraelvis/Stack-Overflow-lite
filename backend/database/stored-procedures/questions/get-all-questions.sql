/* CREATE OR ALTER PROCEDURE usp_GetAllQuestions
    @page INT = 1,
    @itemsPerPage INT = 10
AS
BEGIN
    SELECT *
    FROM Questions
    WHERE isDeleted = 0
    ORDER BY id
    OFFSET (@page - 1) * @itemsPerPage ROWS
    FETCH NEXT @itemsPerPage ROWS ONLY;
END */


CREATE OR ALTER PROCEDURE usp_GetAllQuestions
    @page INT = 1,
    @itemsPerPage INT = 10
AS
BEGIN
    SELECT q.id AS questionId, q.userId AS questionUserId, q.title AS questionTitle, q.body AS questionBody, q.upvotes AS questionUpvotes, q.downvotes AS questionDownvotes, q.isDeleted AS questionIsDeleted, q.createdAt AS questionCreatedAt, q.updatedAt AS questionUpdatedAt,
        u.id AS userId, u.name AS userName, u.email AS userEmail, u.password AS userPassword, u.avatar AS userAvatar, u.bio AS userBio, u.isAdmin AS userIsAdmin, u.isDeleted AS userIsDeleted, u.createdAt AS userCreatedAt, u.updatedAt AS userUpdatedAt,
        t.id AS tagId, t.name AS tagName, t.body AS tagBody, t.createdAt AS tagCreatedAt, t.updatedAt AS tagUpdatedAt,
        a.id AS answerId, a.userId AS answerUserId, a.questionId AS answerQuestionId, a.body AS answerBody, a.upvotes AS answerUpvotes, a.downvotes AS answerDownvotes, a.isAccepted AS answerIsAccepted, a.isDeleted AS answerIsDeleted, a.createdAt AS answerCreatedAt, a.updatedAt AS answerUpdatedAt,
        c.id AS commentId, c.userId AS commentUserId, c.questionId AS commentQuestionId, c.answerId AS commentAnswerId, c.body AS commentBody, c.isDeleted AS commentIsDeleted, c.createdAt AS commentCreatedAt, c.updatedAt AS commentUpdatedAt
    FROM Questions q
        JOIN Users u ON q.userId = u.id
        JOIN QuestionTags qt ON q.id = qt.questionId
        JOIN Tags t ON qt.tagId = t.id
        JOIN Answers a ON q.id = a.questionId
        JOIN Comments c ON q.id = c.questionId OR a.id = c.answerId
    WHERE q.isDeleted = 0
    ORDER BY q.id
    OFFSET (@page - 1) * @itemsPerPage ROWS
    FETCH NEXT @itemsPerPage ROWS ONLY;
END


/* CREATE OR ALTER PROCEDURE usp_GetAllQuestions
    @page INT = 1,
    @itemsPerPage INT = 10
AS
BEGIN
    SELECT q.id AS questionId, q.title AS questionTitle, q.body AS questionBody, q.upvotes AS questionUpvotes, q.downvotes AS questionDownvotes, q.isDeleted AS questionIsDeleted, q.createdAt AS questionCreatedAt, q.updatedAt AS questionUpdatedAt,
        u.id AS userId, u.name AS userName, u.email AS userEmail, u.avatar AS userAvatar, u.bio AS userBio, u.isAdmin AS userIsAdmin, u.isDeleted AS userIsDeleted, u.createdAt AS userCreatedAt, u.updatedAt AS userUpdatedAt,
        (
               SELECT t.id AS tagId, t.name AS tagName, t.body AS tagBody, t.createdAt AS tagCreatedAt, t.updatedAt AS tagUpdatedAt
        FROM QuestionTags qt
            JOIN Tags t ON qt.tagId = t.id
        WHERE qt.questionId = q.id
        FOR JSON PATH
           ) AS tags,
        (
               SELECT a.id AS answerId, a.userId AS answerUserId, a.body AS answerBody, a.upvotes AS answerUpvotes, a.downvotes AS answerDownvotes, a.isAccepted AS answerIsAccepted, a.isDeleted AS answerIsDeleted, a.createdAt AS answerCreatedAt, a.updatedAt AS answerUpdatedAt,
            (
                          SELECT c.id AS commentId, c.userId AS commentUserId, c.body AS commentBody, c.isDeleted AS commentIsDeleted, c.createdAt AS commentCreatedAt, c.updatedAt AS commentUpdatedAt
            FROM Comments c
            WHERE c.answerId = a.id
            FOR JSON PATH
                      ) AS comments
        FROM Answers a
        WHERE a.questionId = q.id
        FOR JSON PATH
           ) AS answers,
        (
               SELECT c.id AS commentId, c.userId AS commentUserId, c.body AS commentBody, c.isDeleted AS commentIsDeleted, c.createdAt AS commentCreatedAt, c.updatedAt AS commentUpdatedAt
        FROM Comments c
        WHERE c.questionId = q.id AND c.answerId IS NULL
        FOR JSON PATH
           ) AS comments
    FROM Questions q
        JOIN Users u ON q.userId = u.id
    WHERE q.isDeleted = 0
    ORDER BY q.id
    OFFSET (@page - 1) * @itemsPerPage ROWS
    FETCH NEXT @itemsPerPage ROWS ONLY;
END */