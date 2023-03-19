CREATE OR ALTER PROCEDURE usp_SearchTagsByName
    @tagName VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM Tags
    WHERE name LIKE '%' + @tagName + '%';
END