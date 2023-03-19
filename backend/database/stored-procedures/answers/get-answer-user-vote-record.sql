CREATE OR ALTER PROCEDURE usp_GetUserAnswerVoteRecord
    @userId INT,
    @answerId INT,
    @voteType VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT *
    FROM Votes
    WHERE userId = @userId AND answerId = @answerId AND voteType = @voteType
END