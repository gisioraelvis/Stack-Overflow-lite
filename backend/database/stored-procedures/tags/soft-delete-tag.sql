CREATE OR ALTER PROCEDURE usp_SoftDeleteTag
    @id INT
AS
BEGIN
    UPDATE Tags
    SET isDeleted = 1,
        updatedAt = CURRENT_TIMESTAMP
    WHERE id = @id;
    SELECT *
    FROM Tags
    WHERE id = @id;
END