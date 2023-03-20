CREATE OR ALTER PROCEDURE usp_GetAllQuestions
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
END