/* 
CREATE TABLE Users
(
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    bio VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    isAdmin BIT NOT NULL
);

CREATE TABLE Questions
(
    id INT PRIMARY KEY IDENTITY(1,1),
    userId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    body VARCHAR(MAX) NOT NULL,
    upvotes INT NOT NULL DEFAULT 0,
    downvotes INT NOT NULL DEFAULT 0,
    isDeleted BIT NOT NULL DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE Answers
(
    id INT PRIMARY KEY IDENTITY(1,1),
    userId INT NOT NULL,
    questionId INT NOT NULL,
    body VARCHAR(MAX) NOT NULL,
    upvotes INT NOT NULL DEFAULT 0,
    downvotes INT NOT NULL DEFAULT 0,
    isAccepted BIT NOT NULL DEFAULT 0,
    isDeleted BIT NOT NULL DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (questionId) REFERENCES Questions(id)
);

CREATE TABLE Comments
(
    id INT PRIMARY KEY IDENTITY(1,1),
    userId INT NOT NULL,
    questionId INT,
    answerId INT,
    body VARCHAR(MAX) NOT NULL,
    isDeleted BIT NOT NULL DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (questionId) REFERENCES Question(id),
    FOREIGN KEY (answerId) REFERENCES Answers(id)
);

CREATE TABLE Tags
(
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(255) NOT NULL,
    body VARCHAR(MAX) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE QuestionTags
(
    questionId INT NOT NULL,
    tagId INT NOT NULL,
    PRIMARY KEY (questionId, tagId),
    FOREIGN KEY (questionId) REFERENCES Questions(id),
    FOREIGN KEY (tagId) REFERENCES Tags(id)
); */

USE StackOverflowLite;

--  Users
DELETE FROM Users;
DBCC CHECKIDENT('Users', RESEED, 0);

INSERT INTO Users
    (name, email, password, avatar, bio, isAdmin)
VALUES
    ('Admin User', 'admin@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 'https://www.gravatar.com/avatar/', 'This is the bio field for the Admin user', 1),
    ('John Doe', 'johndoe@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 'https://www.gravatar.com/avatar/', 'This is the bio field for the user', 0),
    ('Jane Doe', 'janedoe@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 'https://www.gravatar.com/avatar/', 'This is the bio field for the user', 0),
    ('Jim Smith', 'jimsmith@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 'https://www.gravatar.com/avatar/', 'This is the bio field for the user', 0),
    ('Sarah Johnson', 'sarahjohnson@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 'https://www.gravatar.com/avatar/', 'This is the bio field for the user', 0),
    ('Tommy Lee', 'tommylee@example.com', '$2b$10$NI/h5/TnaDWYlKTok5BfXeIXYCWCXuetW.dZMxxj/myjUSY7DpeA6', 'https://www.gravatar.com/avatar/', 'This is the bio field for the user', 0);

--  Questions
