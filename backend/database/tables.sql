USE StackOverflowLite;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Questions;
DROP TABLE IF EXISTS Answers;
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS Tags;
DROP TABLE IF EXISTS QuestionTags;

CREATE TABLE Users
(
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    bio VARCHAR(255),
    isAdmin BIT NOT NULL,
    isDeleted BIT NOT NULL DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
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
    FOREIGN KEY (questionId) REFERENCES Questions(id),
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
);

