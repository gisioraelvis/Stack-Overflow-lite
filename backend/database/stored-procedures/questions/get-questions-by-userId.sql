CREATE OR ALTER PROCEDURE usp_GetQuestionsByUserId
    @userId INT,
    @page INT,
    @itemsPerPage INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT *
    FROM Questions
    WHERE userId = @userId
    ORDER BY createdAt DESC
    OFFSET (@page - 1) * @itemsPerPage ROWS
    FETCH NEXT @itemsPerPage ROWS ONLY;
END