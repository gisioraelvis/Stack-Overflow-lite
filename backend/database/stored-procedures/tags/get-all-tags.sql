CREATE OR ALTER PROCEDURE usp_GetAllTags
    @page INT = 1,
    @itemsPerPage INT = 10
AS
BEGIN
    SELECT *
    FROM Tags
    ORDER BY id
    OFFSET (@page - 1) * @itemsPerPage ROWS
    FETCH NEXT @itemsPerPage ROWS ONLY;
END