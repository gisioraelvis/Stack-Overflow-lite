CREATE OR ALTER PROCEDURE usp_GetAnalytics
AS
BEGIN
    SELECT
        (SELECT COUNT(*) FROM Users) AS totalUsers,
        (SELECT COUNT(*) FROM Questions) AS totalQuestions,
        (SELECT COUNT(*) FROM Answers) AS totalAnswers,
        (SELECT COUNT(*) FROM Comments) AS totalComments,
        (SELECT COUNT(*) FROM Tags) AS totalTags,
        (SELECT COUNT(*) FROM Votes) AS totalVotes
END