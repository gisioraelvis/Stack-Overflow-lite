CREATE OR ALTER PROCEDURE usp_MarkAnswerAccepted
    @answerId INT,
    @isAccepted BIT = 0
AS
BEGIN
    UPDATE Answers
    SET isAccepted =COALESCE(@isAccepted, isAccepted)
    WHERE id = @answerId
END