CREATE OR ALTER PROCEDURE usp_UpdateQuestion
    @id INT,
    @title VARCHAR(255),
    @body VARCHAR(MAX)
AS
BEGIN
    UPDATE Questions
    SET title = COALESCE(@title, title),
        body = COALESCE(@body, body),
        updatedAt = CURRENT_TIMESTAMP
    WHERE id = @id;
END