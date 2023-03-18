CREATE OR ALTER PROCEDURE usp_GetSoftDeletedQuestions
AS
BEGIN
    SELECT *
    FROM Questions
    WHERE isDeleted = 1;
END