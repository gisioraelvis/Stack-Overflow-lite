CREATE OR ALTER PROCEDURE usp_CreateTag
    @name VARCHAR(255),
    @body VARCHAR(MAX),
    @userId INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1
    FROM Tags
    WHERE name = @name)
    BEGIN
        INSERT INTO Tags
            ( name, body, userId)
        VALUES
            (@name, @body, @userId);
    END

    SELECT *
    FROM Tags
    WHERE name = @name;
END
