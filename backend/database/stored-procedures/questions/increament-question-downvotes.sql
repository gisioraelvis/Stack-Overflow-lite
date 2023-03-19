CREATE OR ALTER PROCEDURE usp_IncrementQuestionDownVote
    @questionId INT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Questions SET downvotes = downvotes + 1 WHERE id = @questionId
END