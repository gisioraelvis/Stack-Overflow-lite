CREATE OR ALTER PROCEDURE usp_DeleteUserQuestionVoteRecord
    @questionId INT,
    @userId INT,
    @voteType VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM Votes WHERE questionId = @questionId AND userId = @userId AND voteType = @voteType
END