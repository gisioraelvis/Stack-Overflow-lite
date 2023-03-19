CREATE OR ALTER PROCEDURE usp_GetUserAnswerVoteRecord
    @id INT
AS
BEGIN
    UPDATE Answers
    SET isDeleted = 1
    WHERE id = @id;
END