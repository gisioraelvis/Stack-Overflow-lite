USE StackOverflowLite;
GO

SET NOCOUNT ON;

BEGIN TRY
    -- Disable all foreign key constraints
    EXEC sp_MSforeachtable 'ALTER TABLE ? NOCHECK CONSTRAINT ALL';
    -- Drop all tables
    EXEC sp_MSforeachtable 'DROP TABLE ?';
    -- Reset the identity values of all tables to 0
    EXEC sp_MSforeachtable 'DBCC CHECKIDENT (''?'', RESEED, 0) WITH NO_INFOMSGS';
    -- Enable all foreign key constraints
    EXEC sp_MSforeachtable 'ALTER TABLE ? CHECK CONSTRAINT ALL';
END TRY
BEGIN CATCH
    -- Display error number and message
    SELECT ERROR_NUMBER() AS ErrorNumber, ERROR_MESSAGE() AS ErrorMessage;
END CATCH

/* 
sp_MSforeachtable a system SP, allows to execute a T-SQL statement against each table in a database. 
Example:
-- selects the count of rows in each table in the database.
EXEC sp_MSforeachtable 'SELECT COUNT(*) FROM ?'
*/