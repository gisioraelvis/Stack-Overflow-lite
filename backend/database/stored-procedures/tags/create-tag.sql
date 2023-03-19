CREATE OR ALTER PROCEDURE usp_CreateTag
    @name VARCHAR(255),
    @body VARCHAR(MAX)
AS
BEGIN
    IF NOT EXISTS (SELECT 1
    FROM Tags
    WHERE name = @name)
    BEGIN
        INSERT INTO Tags
            (name, body)
        VALUES
            (@name, @body);
    END

    SELECT *
    FROM Tags
    WHERE name = @name;
END
