CREATE OR ALTER PROCEDURE usp_UpgradeUserToAdmin
    (@id INT)
AS
BEGIN
    UPDATE Users
SET isAdmin = 1, updatedAt = GETDATE()
WHERE id = @id;
END