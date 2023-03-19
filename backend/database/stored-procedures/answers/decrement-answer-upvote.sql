CREATE OR ALTER PROCEDURE usp_DecrementAnswerUpVote
    @answerId INT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Answers SET upvotes = upvotes - 1 WHERE id = @answerId
END