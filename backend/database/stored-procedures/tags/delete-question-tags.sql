-- Deletes all the question-tag/s relation with the given tagId
CREATE OR ALTER PROCEDURE usp_DeleteQuestionTags
    @tagId INT
AS
BEGIN
    DELETE FROM QuestionTags WHERE tagId = @tagId;
END;