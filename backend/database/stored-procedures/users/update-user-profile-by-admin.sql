CREATE OR ALTER PROCEDURE usp_UpdateUserProfileByAdmin
    (
    @id INT,
    @name NVARCHAR(255) = NULL,
    @email NVARCHAR(255) = NULL,
    @avatar NVARCHAR(255) = NULL,
    @bio NVARCHAR(255) = NULL,
    @isAdmin BIT = 0,
    @isDeleted BIT = 0
)
AS
BEGIN
    DECLARE @updatedUser TABLE (
        id INT,
        name NVARCHAR(255),
        email NVARCHAR(255),
        password NVARCHAR(255),
        avatar NVARCHAR(255),
        bio NVARCHAR(255),
        isAdmin BIT,
        isDeleted BIT,
        createdAt DATETIME,
        updatedAt DATETIME
);
    UPDATE Users
        SET name = COALESCE(@name, name),
        email = COALESCE(@email, email),
        avatar = COALESCE(@avatar, avatar),
        bio = COALESCE(@bio, bio),
        isAdmin = COALESCE(@isAdmin, isAdmin),
        isDeleted = COALESCE(@isDeleted, isDeleted),
        updatedAt = GETDATE()
        OUTPUT INSERTED.*
        INTO @updatedUser
        WHERE id = @id;

    SELECT *
    FROM @updatedUser;
END