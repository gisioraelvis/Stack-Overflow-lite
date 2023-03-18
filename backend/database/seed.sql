USE StackOverflowLite;

--  Users
DELETE FROM Users;
DBCC CHECKIDENT('Users', RESEED, 1);

INSERT INTO Users
    (name, email, password, avatar, bio, isAdmin)
VALUES
    ('Admin User', 'admin@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 'https://www.gravatar.com/avatar/', 'This is the bio field for the Admin user', 1),
    ('John Doe', 'johndoe@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 'https://www.gravatar.com/avatar/', 'This is the bio field for the user', 0),
    ('Jane Doe', 'janedoe@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 'https://www.gravatar.com/avatar/', 'This is the bio field for the user', 0),
    ('Jim Smith', 'jimsmith@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 'https://www.gravatar.com/avatar/', 'This is the bio field for the user', 0),
    ('Sarah Johnson', 'sarahjohnson@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 'https://www.gravatar.com/avatar/', 'This is the bio field for the user', 0),
    ('Tommy Lee', 'tommylee@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 'https://www.gravatar.com/avatar/', 'This is the bio field for the user', 0),
    ('Doe John', 'doejohn@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 'https://www.gravatar.com/avatar/', 'This is the bio field for the user', 0),
    ('Doe Jane', 'doejane@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 'https://www.gravatar.com/avatar/', 'This is the bio field for the user', 0),
    ('Smith Jim', 'smithjim@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 'https://www.gravatar.com/avatar/', 'This is the bio field for the user', 0),
    ('Johnson Sarah', 'johnsonsarah@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 'https://www.gravatar.com/avatar/', 'This is the bio field for the user', 0),
    ('Lee Tommy', 'leetommy@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 'https://www.gravatar.com/avatar/', 'This is the bio field for the user', 0);


--  Questions
DELETE FROM Questions;
DBCC CHECKIDENT('Questions', RESEED, 1);

INSERT INTO Questions
    (userId, title, body, upvotes, downvotes, isDeleted)
VALUES
    (2, 'How do I create a database in SQL Server?', 'I am trying to create a database in SQL Server but I am getting an error. Can someone help me?', 0, 0, 0),
    (3, 'How do I create a table in SQL Server?', 'I am trying to create a table in SQL Server but I am getting an error. Can someone help me?', 0, 0, 0),
    (4, 'How do I create a stored procedure in SQL Server?', 'I am trying to create a stored procedure in SQL Server but I am getting an error. Can someone help me?', 0, 0, 0),
    (5, 'How do I create a view in SQL Server?', 'I am trying to create a view in SQL Server but I am getting an error. Can someone help me?', 0, 0, 0),
    (6, 'How do I create a function in SQL Server?', 'I am trying to create a function in SQL Server but I am getting an error. Can someone help me?', 0, 0, 0),
    (7, 'How do I create a trigger in SQL Server?', 'I am trying to create a trigger in SQL Server but I am getting an error. Can someone help me?', 0, 0, 0),
    (8, 'How do I create a user in SQL Server?', 'I am trying to create a user in SQL Server but I am getting an error. Can someone help me?', 0, 0, 0),
    (9, 'How do I create a role in SQL Server?', 'I am trying to create a role in SQL Server but I am getting an error. Can someone help me?', 0, 0, 0),
    (10, 'How do I create a schema in SQL Server?', 'I am trying to create a schema in SQL Server but I am getting an error. Can someone help me?', 0, 0, 0),
    (2, 'How do I create a login in SQL Server?', 'I am trying to create a login in SQL Server but I am getting an error. Can someone help me?', 0, 0, 0),
    (3, 'How do I create a database in MySQL?', 'I am trying to create a database in MySQL but I am getting an error. Can someone help me?', 0, 0, 0),
    (4, 'How do I create a table in MySQL?', 'I am trying to create a table in MySQL but I am getting an error. Can someone help me?', 0, 0, 0),
    (5, 'How do I create a stored procedure in MySQL?', 'I am trying to create a stored procedure in MySQL but I am getting an error. Can someone help me?', 0, 0, 0),
    (6, 'How do I create a view in MySQL?', 'I am trying to create a view in MySQL but I am getting an error. Can someone help me?', 0, 0, 0),
    (7, 'How do I create a function in MySQL?', 'I am trying to create a function in MySQL but I am getting an error. Can someone help me?', 0, 0, 0),
    (8, 'How do I create a trigger in MySQL?', 'I am trying to create a trigger in MySQL but I am getting an error. Can someone help me?', 0, 0, 0),
    (9, 'How do I create a user in MySQL?', 'I am trying to create a user in MySQL but I am getting an error. Can someone help me?', 0, 0, 0),
    (10, 'How do I create a role in MySQL?', 'I am trying to create a role in MySQL but I am getting an error. Can someone help me?', 0, 0, 0),
    (2, 'How do I create a schema in MySQL?', 'I am trying to create a schema in MySQL but I am getting an error. Can someone help me?', 0, 0, 0),
    (3, 'How do I create a login in MySQL?', 'I am trying to create a login in MySQL but I am getting an error. Can someone help me?', 0, 0, 0),
    (4, 'How do I create a database in PostgreSQL?', 'I am trying to create a database in PostgreSQL but I am getting an error. Can someone help me?', 0, 0, 0),
    (5, 'How do I create a table in PostgreSQL?', 'I am trying to create a table in PostgreSQL but I am getting an error Can someone help me?', 0, 0, 0),
    (6, 'How do I create a stored procedure in PostgreSQL?', 'I am trying to create a stored procedure in PostgreSQL but I am getting an error. Can someone help me?', 0, 0, 0),
    (7, 'How do I create a view in PostgreSQL?', 'I am trying to create a view in PostgreSQL but I am getting an error. Can someone help me?', 0, 0, 0),
    (8, 'How do I create a function in PostgreSQL?', 'I am trying to create a function in PostgreSQL but I am getting an error. Can someone help me?', 0, 0, 0),
    (9, 'How do I create a trigger in PostgreSQL?', 'I am trying to create a trigger in PostgreSQL but I am getting an error. Can someone help me?', 0, 0, 0),
    (10, 'How do I create a user in PostgreSQL?', 'I am trying to create a user in PostgreSQL but I am getting an error. Can someone help me?', 0, 0, 0),
    (2, 'How do I create a role in PostgreSQL?', 'I am trying to create a role in PostgreSQL but I am getting an error. Can someone help me?', 0, 0, 0),
    (3, 'How do I create a schema in PostgreSQL?', 'I am trying to create a schema in PostgreSQL but I am getting an error. Can someone help me?', 0, 0, 0),
    (4, 'How do I create a login in PostgreSQL?', 'I am trying to create a login in PostgreSQL but I am getting an error. Can someone help me?', 0, 0, 0);


--  Answers
DELETE FROM Answers;
DBCC CHECKIDENT('Answers', RESEED, 1);

INSERT INTO Answers
    (userId, questionId, body, upvotes, downvotes, isDeleted)
VALUES
    (2, 1, 'You need to use the CREATE DATABASE statement.', 0, 0, 0),
    (3, 1, 'You need to use the CREATE DATABASE statement.', 0, 0, 0),
    (4, 1, 'You need to use the CREATE DATABASE statement.', 0, 0, 0),
    (5, 1, 'You need to use the CREATE DATABASE statement.', 0, 0, 0),
    (6, 1, 'You need to use the CREATE DATABASE statement.', 0, 0, 0),
    (7, 1, 'You need to use the CREATE DATABASE statement.', 0, 0, 0),
    (8, 1, 'You need to use the CREATE DATABASE statement.', 0, 0, 0),
    (9, 1, 'You need to use the CREATE DATABASE statement.', 0, 0, 0),
    (10, 1, 'You need to use the CREATE DATABASE statement.', 0, 0, 0),
    (2, 2, 'You need to use the CREATE TABLE statement.', 0, 0, 0),
    (3, 2, 'You need to use the CREATE TABLE statement.', 0, 0, 0),
    (4, 2, 'You need to use the CREATE TABLE statement.', 0, 0, 0),
    (5, 2, 'You need to use the CREATE TABLE statement.', 0, 0, 0),
    (6, 2, 'You need to use the CREATE TABLE statement.', 0, 0, 0),
    (7, 2, 'You need to use the CREATE TABLE statement.', 0, 0, 0),
    (8, 2, 'You need to use the CREATE TABLE statement.', 0, 0, 0),
    (9, 2, 'You need to use the CREATE TABLE statement.', 0, 0, 0),
    (10, 2, 'You need to use the CREATE TABLE statement.', 0, 0, 0),
    (2, 3, 'You need to use the CREATE PROCEDURE statement.', 0, 0, 0),
    (3, 3, 'You need to use the CREATE PROCEDURE statement.', 0, 0, 0),
    (4, 3, 'You need to use the CREATE PROCEDURE statement.', 0, 0, 0),
    (5, 3, 'You need to use the CREATE PROCEDURE statement.', 0, 0, 0),
    (6, 3, 'You need to use the CREATE PROCEDURE statement.', 0, 0, 0),
    (7, 3, 'You need to use the CREATE PROCEDURE statement.', 0, 0, 0),
    (8, 3, 'You need to use the CREATE PROCEDURE statement.', 0, 0, 0),
    (9, 3, 'You need to use the CREATE PROCEDURE statement.', 0, 0, 0),
    (10, 3, 'You need to use the CREATE PROCEDURE statement.', 0, 0, 0),
    (2, 4, 'You need to use the CREATE VIEW statement.', 0, 0, 0),
    (3, 4, 'You need to use the CREATE VIEW statement.', 0, 0, 0),
    (4, 4, 'You need to use the CREATE VIEW statement.', 0, 0, 0),
    (5, 4, 'You need to use the CREATE VIEW statement.', 0, 0, 0),
    (6, 4, 'You need to use the CREATE VIEW statement.', 0, 0, 0),
    (7, 4, 'You need to use the CREATE VIEW statement.', 0, 0, 0),
    (8, 4, 'You need to use the CREATE VIEW statement.', 0, 0, 0),
    (9, 4, 'You need to use the CREATE VIEW statement.', 0, 0, 0),
    (10, 4, 'You need to use the CREATE VIEW statement.', 0, 0, 0);

--  Comments
DELETE FROM Comments;
DBCC CHECKIDENT('Comments', RESEED, 1);

INSERT INTO Comments
    (userId, questionId, answerId, body, isDeleted)
VALUES
    (2, 1, NULL, 'This is a comment.', 0),
    (3, 1, NULL, 'This is a comment.', 0),
    (4, 1, NULL, 'This is a comment.', 0),
    (5, 1, NULL, 'This is a comment.', 0),
    (6, 1, NULL, 'This is a comment.', 0),
    (7, 1, NULL, 'This is a comment.', 0),
    (8, 1, NULL, 'This is a comment.', 0),
    (9, 1, NULL, 'This is a comment.', 0),
    (10, 1, NULL, 'This is a comment.', 0),
    (2, 2, NULL, 'This is a comment.', 0),
    (3, 2, NULL, 'This is a comment.', 0),
    (4, 2, NULL, 'This is a comment.', 0),
    (5, 2, NULL, 'This is a comment.', 0),
    (6, 2, NULL, 'This is a comment.', 0),
    (7, 2, NULL, 'This is a comment.', 0),
    (8, 2, NULL, 'This is a comment.', 0),
    (9, 2, NULL, 'This is a comment.', 0),
    (10, 2, NULL, 'This is a comment.', 0),
    (2, 3, NULL, 'This is a comment.', 0),
    (3, 3, NULL, 'This is a comment.', 0),
    (4, 3, NULL, 'This is a comment.', 0),
    (5, 3, NULL, 'This is a comment.', 0),
    (6, 3, NULL, 'This is a comment.', 0),
    (7, 3, NULL, 'This is a comment.', 0),
    (8, 3, NULL, 'This is a comment.', 0),
    (9, 3, NULL, 'This is a comment.', 0),
    (10, 3, NULL, 'This is a comment.', 0),
    (2, 4, NULL, 'This is a comment.', 0),
    (3, 4, NULL, 'This is a comment.', 0),
    (4, 4, NULL, 'This is a comment.', 0),
    (5, 4, NULL, 'This is a comment.', 0),
    (6, 4, NULL, 'This is a comment.', 0),
    (7, 4, NULL, 'This is a comment.', 0),
    (8, 4, NULL, 'This is a comment.', 0),
    (9, 4, NULL, 'This is a comment.', 0),
    (10, 4, NULL, 'This is a comment.', 0),
    (2, NULL, 1, 'This is a comment.', 0),
    (3, NULL, 1, 'This is a comment.', 0),
    (4, NULL, 1, 'This is a comment.', 0),
    (5, NULL, 1, 'This is a comment.', 0),
    (6, NULL, 1, 'This is a comment.', 0),
    (7, NULL, 1, 'This is a comment.', 0),
    (8, NULL, 1, 'This is a comment.', 0),
    (9, NULL, 1, 'This is a comment.', 0),
    (10, NULL, 1, 'This is a comment.', 0),
    (2, NULL, 2, 'This is a comment.', 0),
    (3, NULL, 2, 'This is a comment.', 0),
    (4, NULL, 2, 'This is a comment.', 0),
    (5, NULL, 2, 'This is a comment.', 0),
    (6, NULL, 2, 'This is a comment.', 0),
    (7, NULL, 2, 'This is a comment.', 0),
    (8, NULL, 2, 'This is a comment.', 0),
    (9, NULL, 2, 'This is a comment.', 0),
    (10, NULL, 2, 'This is a comment.', 0),
    (2, NULL, 3, 'This is a comment.', 0);

-- Tags
DELETE FROM Tags;
DBCC CHECKIDENT('Tags', RESEED, 1);

INSERT INTO Tags
    (name, body)
VALUES
    ('SQL', 'SQL is a standard language for storing, manipulating and retrieving data in databases.'),
    ('MySQL', 'MySQL is an open-source relational database management system.'),
    ('SQL Server', 'SQL Server is a relational database management system developed by Microsoft.'),
    ('Oracle', 'Oracle is a relational database management system developed by Oracle Corporation.'),
    ('PostgreSQL', 'PostgreSQL is a powerful, open source object-relational database system.'),
    ('MongoDB', 'MongoDB is a cross-platform document-oriented database program.'),
    ('C#', 'C# is a general-purpose, multi-paradigm programming language encompassing strong typing, lexically scoped, imperative, declarative, functional, generic, object-oriented (class-based), and component-oriented programming disciplines.'),
    ('Java', 'Java is a general-purpose computer-programming language that is concurrent, class-based, object-oriented, and specifically designed to have as few implementation dependencies as possible.'),
    ('JavaScript', 'JavaScript is a high-level, interpreted programming language.'),
    ('Python', 'Python is an interpreted, high-level, general-purpose programming language.'),
    ('PHP', 'PHP is a server-side scripting language designed for web development but also used as a general-purpose programming language.'),
    ('C++', 'C++ is a general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language, or "C with Classes".'),
    ('C', 'C is a general-purpose, procedural computer programming language supporting structured programming, lexical variable scope, and recursion, with a static type system.'),
    ('HTML', 'HTML is the standard markup language for creating web pages and web applications.'),
    ('CSS', 'Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language such as HTML.'),
    ('XML', 'XML is a markup language that defines a set of rules for encoding documents in a format that is both human-readable and machine-readable.'),
    ('JSON', 'JSON is a lightweight data-interchange format.'),
    ('ASP.NET', 'ASP.NET is a web application framework developed and marketed by Microsoft to allow programmers to build dynamic web sites, web applications and web services.'),
    ('ASP.NET Core', 'ASP.NET Core is a cross-platform version of ASP.NET.'),
    ('ASP.NET MVC', 'ASP.NET MVC is a web application framework developed by Microsoft, which implements the model–view controller (MVC) pattern.'),
    ('ASP.NET Web API', 'ASP.NET Web API is a framework that makes it easy to build HTTP services that reach a broad range of clients, including browsers and mobile devices.'),
    ('Node.js', 'Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a browser.'),
    ('Angular', 'Angular is a TypeScript-based open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations.'),
    ('React', 'React is an open-source, front end, JavaScript library for building user interfaces or UI components.'),
    ('Vue.js', 'Vue.js is an open-source model–view–viewmodel front end JavaScript framework for building user interfaces and single-page applications.'),
    ('Bootstrap', 'Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development.'),
    ('jQuery', 'jQuery is a JavaScript library designed to simplify HTML DOM tree traversal and manipulation, as well as event handling, CSS animation, and Ajax.'),
    ('Laravel', 'Laravel is a free, open-source PHP web framework, created by Taylor Otwell and intended for the development of web applications following the model–view–controller (MVC) architectural pattern.'),
    ('Django', 'Django is a free and open-source web framework, written in Python, which follows the model–view–controller (MVC) architectural pattern.'),
    ('Flask', 'Flask is a micro web framework written in Python.'),
    ('Spring', 'Spring is a Java platform that provides comprehensive infrastructure support for developing Java applications.'),
    ('Spring Boot', 'Spring Boot is a Java-based framework used to create a micro Service.'),
    ('Spring MVC', 'Spring MVC is a web framework that is used to build web applications.'),
    ('Spring Security', 'Spring Security is a framework that focuses on providing both authentication and authorization to Java applications.'),
    ('Spring Data', 'Spring Data is a project that provides a familiar and consistent, Spring-based programming model for data access while still retaining the special traits of the underlying data store.'),
    ('Spring Cloud', 'Spring Cloud is a framework that provides tools for developers to quickly build some of the common patterns in distributed systems.'),
    ('Spring Batch', 'Spring Batch is a lightweight, comprehensive batch framework designed to enable the development of robust batch applications vital for the daily operations of enterprise systems.');


-- QuestionTags
DELETE FROM QuestionTags;

INSERT INTO QuestionTags
    (questionId, tagId)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (2, 1),
    (2, 2),
    (2, 3),
    (2, 4),
    (2, 5),
    (2, 6),
    (3, 1),
    (3, 2),
    (3, 3),
    (3, 4),
    (3, 5),
    (3, 6),
    (4, 1),
    (4, 2),
    (4, 3),
    (4, 4),
    (4, 5),
    (4, 6),
    (5, 1),
    (5, 2),
    (5, 3),
    (5, 4),
    (5, 5),
    (5, 6),
    (6, 1),
    (6, 2),
    (6, 3),
    (6, 4),
    (6, 5),
    (6, 6),
    (7, 1),
    (7, 2),
    (7, 3),
    (7, 4),
    (7, 5),
    (7, 6),
    (8, 1),
    (8, 2),
    (8, 3),
    (8, 4),
    (8, 5),
    (8, 6),
    (9, 1),
    (9, 2),
    (9, 3),
    (9, 4),
    (9, 5),
    (9, 6),
    (10, 1),
    (10, 2),
    (10, 3),
    (10, 4),
    (10, 5),
    (10, 6);



