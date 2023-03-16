CREATE OR ALTER PROCEDURE usp_FindUserById
    (@id INT)
AS
BEGIN
    SELECT *
    FROM Users
    WHERE id = @id
END