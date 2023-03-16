CREATE OR ALTER PROCEDURE usp_RegisterUser(
    @name VARCHAR(255),
    @email VARCHAR(255),
    @password VARCHAR(255),
    @isAdmin BIT = 0
)
AS
BEGIN
    INSERT INTO Users
        (name, email, password, isAdmin)
    VALUES
        (@name, @email, @password, @isAdmin);

    SELECT *
    FROM Users
    WHERE email = @email;
END
