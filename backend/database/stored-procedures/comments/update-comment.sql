CREATE OR ALTER PROCEDURE usp_UpdateComment
    @id INT,
    @body VARCHAR(MAX)
AS
BEGIN
    UPDATE Comments
    SET body = COALESCE(@body, body),
        updatedAt = CURRENT_TIMESTAMP
    WHERE id = @id;
    SELECT *
    FROM Comments
    WHERE id = @id;
END