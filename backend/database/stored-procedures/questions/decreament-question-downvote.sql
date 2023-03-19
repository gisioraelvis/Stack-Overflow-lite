CREATE OR ALTER PROCEDURE usp_DecrementQuestionDownVote
    @questionId INT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Questions SET downvotes = downvotes - 1 WHERE id = @questionId
END
