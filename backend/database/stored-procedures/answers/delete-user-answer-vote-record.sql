CREATE OR ALTER PROCEDURE usp_DeleteUserAnswerVoteRecord
    @answerId INT,
    @userId INT,
    @voteType VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM Votes WHERE answerId = @answerId AND userId = @userId AND voteType = @voteType
END