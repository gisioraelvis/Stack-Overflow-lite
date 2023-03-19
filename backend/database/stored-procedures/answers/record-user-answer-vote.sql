CREATE OR ALTER PROCEDURE usp_RecordUserAnswerVote
    @answerId INT,
    @userId INT,
    @voteType VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Votes
        (answerId, userId, voteType)
    VALUES
        (@answerId, @userId, @voteType)
END
