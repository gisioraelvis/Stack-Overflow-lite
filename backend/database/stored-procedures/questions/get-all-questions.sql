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
    SELECT q.*, COUNT(a.id) AS totalAnswers
    FROM Questions q
        LEFT JOIN Answers a ON a.questionId = q.id
    WHERE q.isDeleted = 0
    GROUP BY q.id, q.userId, q.title, q.body, q.upvotes, q.downvotes, q.isDeleted, q.createdAt, q.updatedAt
    ORDER BY q.id
    OFFSET (@page - 1) * @itemsPerPage ROWS
    FETCH NEXT @itemsPerPage ROWS ONLY;
END