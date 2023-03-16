CREATE OR ALTER PROCEDURE usp_GetAllUsers
AS
BEGIN
    SELECT id, name, email, avatar, bio, isAdmin, isDeleted, createdAt, updatedAt
    FROM Users
    WHERE isDeleted = 0;
END