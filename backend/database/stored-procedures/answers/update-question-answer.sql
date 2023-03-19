CREATE OR ALTER PROCEDURE usp_UpdateQuestionAnswer
    @id INT,
    @body VARCHAR(MAX)
AS
BEGIN
    UPDATE Answers
    SET body = COALESCE(@body, body),
        updatedAt = CURRENT_TIMESTAMP
    WHERE id = @id;
    SELECT *
    FROM Answers
    WHERE id = @id;
END