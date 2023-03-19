CREATE OR ALTER PROCEDURE usp_DecrementQuestionUpVote
    @questionId INT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Questions SET upvotes = upvotes - 1 WHERE id = @questionId
END