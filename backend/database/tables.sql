USE StackOverflowLite;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Questions;
DROP TABLE IF EXISTS Answers;
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS Tags;
DROP TABLE IF EXISTS QuestionTags;

USE StackOverflowLite;
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
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
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

CREATE TABLE Votes
(
    id INT PRIMARY KEY IDENTITY(1,1),
    userId INT NOT NULL,
    questionId INT,
    answerId INT,
    voteType VARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (questionId) REFERENCES Questions(id),
    FOREIGN KEY (answerId) REFERENCES Answers(id)
);

/* 
    // check if the user upvoted the question already
    const questionUpvote = await dbUtils.exec("usp_GetUserQuestionVoteRecord", {
      userId: user.id,
      questionId: id,
      voteType: "upvote",
    });
    if (questionUpvote.recordset.length > 0) {
      return res
        .status(400)
        .json({ message: "You already upvoted this question" });
    }

    // check if the user downvoted the question before
    const questionDownvote = await dbUtils.exec("usp_GetUserQuestionVoteRecord", {
      userId: user.id,
      questionId: id,
      voteType: "downvote",
    });
    if (questionDownvote.recordset.length > 0) {
      // decrement the downvote count on the question
      await dbUtils.exec("usp_DecrementQuestionVote", { questionId: id });

      // remove the user downvote record from the Votes table
      await dbUtils.exec("usp_DeleteUserQuestionVoteRecord", {
        questionId: id,
        userId: user.id,
        voteType: "downvote",
      });
    }

    // upvote the question
    await dbUtils.exec("usp_IncrementQuestionVote", { questionId: id });

    // mark the question as upvoted by the user
    await dbUtils.exec("usp_RecordUserQuestionVote", {
      questionId: id,
      userId: user.id,
      voteType: "upvote",
    });
 */

CREATE OR ALTER PROCEDURE usp_GetUserQuestionVoteRecord
    @userId INT,
    @questionId INT,
    @voteType VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT *
    FROM Votes
    WHERE userId = @userId AND questionId = @questionId AND voteType = @voteType
END

CREATE OR ALTER PROCEDURE usp_DecrementQuestionDownVote
    @questionId INT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Questions SET downvotes = downvotes - 1 WHERE id = @questionId
END

CREATE OR ALTER PROCEDURE usp_DeleteUserQuestionVoteRecord
    @questionId INT,
    @userId INT,
    @voteType VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM Votes WHERE questionId = @questionId AND userId = @userId AND voteType = @voteType
END

CREATE OR ALTER PROCEDURE usp_IncrementQuestionUpVote
    @questionId INT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Questions SET upvotes = upvotes + 1 WHERE id = @questionId
END

CREATE OR ALTER PROCEDURE usp_RecordUserQuestionVote
    @questionId INT,
    @userId INT,
    @voteType VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Votes
        (questionId, userId, voteType)
    VALUES
        (@questionId, @userId, @voteType)
END

CREATE OR ALTER PROCEDURE usp_DecrementQuestionUpVote
    @questionId INT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Questions SET upvotes = upvotes - 1 WHERE id = @questionId
END

CREATE OR ALTER PROCEDURE usp_IncrementQuestionDownVote
    @questionId INT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Questions SET downvotes = downvotes + 1 WHERE id = @questionId
END

-- answers
/* 
    const answer = await dbUtils.exec("usp_CreateQuestionAnswer", {
      questionId,
      userId: user.id,
      body,
    });
 */
CREATE OR ALTER PROCEDURE usp_CreateQuestionAnswer
    @questionId INT,
    @userId INT,
    @body VARCHAR(MAX)
AS
BEGIN
    INSERT INTO Answers
        (questionId, userId, body)
    VALUES
        (@questionId, @userId, @body)
    SELECT * FROM Answers WHERE id = SCOPE_IDENTITY()
END
















