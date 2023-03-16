CREATE OR ALTER PROCEDURE usp_DeleteUser
    (@id INT)
AS
BEGIN
    DELETE 
    FROM Users
    WHERE id = @id
END
