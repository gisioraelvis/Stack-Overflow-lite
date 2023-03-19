CREATE OR ALTER PROCEDURE usp_GetUserQuestionVoteRecord
    @userId INT,
    @questionId INT,
    @voteType VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT *
    FROM Votes
    WHERE userId = @userId AND questionId = @questionId AND voteType = @voteType
END