CREATE OR ALTER PROCEDURE usp_CreateQuestionTag
    @questionId INT,
    @tagId INT
AS
BEGIN
    INSERT INTO QuestionTags
        (questionId, tagId)
    VALUES
        (@questionId, @tagId);
END
