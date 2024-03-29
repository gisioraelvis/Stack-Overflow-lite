CREATE OR ALTER PROCEDURE usp_GetAllUsers
    @page INT = 1,
    @itemsPerPage INT = 10
AS
BEGIN
    SELECT id, name, email, avatar, bio, isAdmin, isDeleted, createdAt, updatedAt
    FROM Users
    WHERE isDeleted = 0
    ORDER BY id
    OFFSET (@page - 1) * @itemsPerPage ROWS
    FETCH NEXT @itemsPerPage ROWS ONLY;
END