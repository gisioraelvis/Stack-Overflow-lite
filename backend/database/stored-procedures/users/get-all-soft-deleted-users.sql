CREATE OR ALTER PROCEDURE usp_GetAllSoftDeletedUsers
    @page INT = 1,
    @itemsPerPage INT = 10
AS
BEGIN
    SELECT id, name, email, avatar, bio, isAdmin, isDeleted, createdAt, updatedAt
    FROM Users
    WHERE isDeleted = 1
    ORDER BY id
    OFFSET (@page - 1) * @itemsPerPage ROWS
    FETCH NEXT @itemsPerPage ROWS ONLY;
END