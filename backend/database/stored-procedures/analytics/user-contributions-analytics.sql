CREATE OR ALTER PROCEDURE usp_GetUserSiteAnalytics
    @userId INT
AS
BEGIN
    SELECT
        (SELECT COUNT(*) FROM Questions WHERE userId = @userId) AS totalQuestions,
        (SELECT COUNT(*) FROM Answers WHERE userId = @userId) AS totalAnswers,
        (SELECT COUNT(*) FROM Comments WHERE userId = @userId) AS totalComments,
        (SELECT COUNT(*) FROM Tags WHERE userId = @userId) AS totalTags,
        (SELECT COUNT(*) FROM Votes WHERE userId = @userId) AS totalVotes,
        (SELECT COUNT(*) FROM Answers WHERE userId = @userId AND isAccepted = 1) AS totalAcceptedAnswers
END