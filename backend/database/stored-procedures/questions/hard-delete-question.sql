CREATE OR ALTER PROCEDURE usp_HardDeleteQuestion
    @id INT
AS
BEGIN
    DELETE FROM Questions
    WHERE id = @id;
END