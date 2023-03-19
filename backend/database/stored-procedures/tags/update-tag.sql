CREATE OR ALTER PROCEDURE usp_UpdateTag
    @id INT,
    @name VARCHAR(255),
    @body VARCHAR(MAX)
AS
BEGIN
    UPDATE Tags
    SET name = COALESCE(@name, name),
        body = COALESCE(@body, body),
        updatedAt = CURRENT_TIMESTAMP
    WHERE id = @id;
    SELECT *
    FROM Tags
    WHERE id = @id;
END