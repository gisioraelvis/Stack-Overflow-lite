import { IComment, ICommentObject } from "../interfaces/comment.interface";
import { IQuestion, IQuestionObject } from "../interfaces/question.interface";
import { ITag } from "../interfaces/tag.interface";

export const formatQuestionTags = (
  questions: IQuestionObject[]
): IQuestion[] => {
  return questions.map((question) => {
    const user = {
      id: question.userId,
      name: question.userName,
      email: question.userEmail,
      avatar: question.userAvatar,
      isAdmin: question.userIsAdmin,
    };

    const tags = questions
      .filter((q) => q.questionId === question.questionId)
      .map((q) => {
        if (q.tagName === null || undefined) return [] as ITag[];
        return {
          id: q.tagId,
          name: q.tagName,
          body: q.tagBody,
          createdAt: q.tagCreatedAt,
          updatedAt: q.tagUpdatedAt,
        };
      })
      .flat()
      .filter((tag, index, self) => {
        return self.findIndex((t) => t.id === tag.id) === index;
      });

    return {
      id: question.questionId,
      title: question.questionTitle,
      body: question.questionBody,
      user,
      upvotes: question.questionUpvotes,
      downvotes: question.questionDownvotes,
      isDeleted: question.questionIsDeleted,
      createdAt: question.questionCreatedAt,
      updatedAt: question.questionUpdatedAt,
      tags,
    };
  });
};

/* 

    const formattedQuestionComments: IComment[] = comments.recordset.map(
      (comment: ICommentObject) => {
        const user = {
          id: comment.userId,
          name: comment.userName,
          email: comment.userEmail,
          avatar: comment.userAvatar,
          isAdmin: comment.userIsAdmin,
        };

        return {
          id: comment.commentId,
          body: comment.commentBody,
          user,
          createdAt: comment.commentCreatedAt,
          updatedAt: comment.commentUpdatedAt,
        };
      }
    );
*/

export const formatQuestionComments = (
  comments: ICommentObject[]
): IComment[] => {
  return comments.map((comment) => {
    const user = {
      id: comment.userId,
      name: comment.userName,
      email: comment.userEmail,
      avatar: comment.userAvatar,
      isAdmin: comment.userIsAdmin,
    };

    return {
      id: comment.commentId,
      body: comment.commentBody,
      user,
      createdAt: comment.commentCreatedAt,
      updatedAt: comment.commentUpdatedAt,
    };
  });
};
