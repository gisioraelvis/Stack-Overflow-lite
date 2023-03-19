CREATE OR ALTER PROCEDURE usp_IncrementAnswerDownVote
    @answerId INT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Answers SET downvotes = downvotes + 1 WHERE id = @answerId
END