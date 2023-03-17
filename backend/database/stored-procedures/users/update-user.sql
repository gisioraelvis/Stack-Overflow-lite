CREATE OR ALTER PROCEDURE usp_UpdateUser(
    @id INT,
    @name NVARCHAR(255) = NULL,
    @email NVARCHAR(255) = NULL,
    @avatar NVARCHAR(255) = NULL,
    @bio NVARCHAR(255) = NULL,
    @password NVARCHAR(255) = NULL,
    @isAdmin BIT = 0,
    @isDeleted BIT = 0
)
AS
BEGIN
    UPDATE Users
        SET name = COALESCE(@name, name),
        email = COALESCE(@email, email),
        avatar = COALESCE(@avatar, avatar),
        bio = COALESCE(@bio, bio),
        password = COALESCE(@password, password),
        isAdmin = COALESCE(@isAdmin, isAdmin),
        isDeleted = COALESCE(@isDeleted, isDeleted),
        updatedAt = CURRENT_TIMESTAMP
        WHERE id = @id;
    SELECT *
    FROM users
    WHERE id = @id;
END