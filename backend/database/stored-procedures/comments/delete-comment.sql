CREATE OR ALTER PROCEDURE usp_DeleteComment
    @id INT
AS
BEGIN
    DELETE FROM Comments
    WHERE id = @id;
END
