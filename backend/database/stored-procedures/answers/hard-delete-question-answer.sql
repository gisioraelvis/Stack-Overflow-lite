CREATE OR ALTER PROCEDURE usp_HardDeleteQuestionAnswer
    @id INT
AS
BEGIN
    DELETE FROM Answers
    WHERE id = @id;
END