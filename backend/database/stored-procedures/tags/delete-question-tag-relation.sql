CREATE OR ALTER PROCEDURE usp_DeleteQuestionTags
    @questionId INT
AS
BEGIN
    DELETE FROM QuestionTags
    WHERE questionId = @questionId;
END