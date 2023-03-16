CREATE OR ALTER PROCEDURE usp_FindUserByEmail
    (@email VARCHAR(255))
AS
BEGIN
    SELECT *
    FROM Users
    WHERE email = @email
END
