CREATE OR ALTER PROCEDURE usp_HardDeleteTag
    @id INT
AS
BEGIN
    DELETE FROM Tags
    WHERE id = @id;
END