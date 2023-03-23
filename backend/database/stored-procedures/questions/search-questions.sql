CREATE OR ALTER PROCEDURE usp_SearchQuestions
    @searchTerm VARCHAR(255),
    @page INT,
    @itemsPerPage INT
AS
BEGIN
    SELECT * FROM Questions
    WHERE title LIKE '%' + @searchTerm + '%'
    OR body LIKE '%' + @searchTerm + '%'
    ORDER BY createdAt DESC
    OFFSET (@page - 1) * @itemsPerPage ROWS
    FETCH NEXT @itemsPerPage ROWS ONLY
END