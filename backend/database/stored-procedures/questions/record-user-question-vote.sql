CREATE OR ALTER PROCEDURE usp_RecordUserQuestionVote
    @questionId INT,
    @userId INT,
    @voteType VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Votes
        (questionId, userId, voteType)
    VALUES
        (@questionId, @userId, @voteType)
END