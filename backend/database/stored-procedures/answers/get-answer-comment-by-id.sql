CREATE OR ALTER PROCEDURE usp_GetAnswerCommentById
    @id INT,
    @answerId INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT *
    FROM Comments
    WHERE id = @id AND answerId = @answerId
END