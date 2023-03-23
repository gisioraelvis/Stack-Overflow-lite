/* CREATE OR ALTER PROCEDURE usp_GetAllTags
    @page INT = 1,
    @itemsPerPage INT = 10
AS
BEGIN
    SELECT *
    FROM Tags
    ORDER BY id
    OFFSET (@page - 1) * @itemsPerPage ROWS
    FETCH NEXT @itemsPerPage ROWS ONLY;
END */
CREATE OR ALTER PROCEDURE usp_GetAllTags
    @page INT = 1,
    @itemsPerPage INT = 10
AS
BEGIN
    SELECT t.*, COUNT(qt.questionId) AS totalQuestions
    FROM Tags t
        LEFT JOIN QuestionTags qt ON qt.tagId = t.id
    GROUP BY t.id, t.userId, t.name, t.body, t.createdAt, t.updatedAt
    ORDER BY t.id
    OFFSET (@page - 1) * @itemsPerPage ROWS
    FETCH NEXT @itemsPerPage ROWS ONLY;
END
