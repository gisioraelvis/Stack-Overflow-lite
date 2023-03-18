import { IQuestion, IQuestionObject } from "../interfaces/question.interface";

export const formatQuestions = (questions: IQuestionObject[]): IQuestion[] => {
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
        return {
          id: q.tagId,
          name: q.tagName,
          body: q.tagBody,
          createdAt: q.tagCreatedAt,
          updatedAt: q.tagUpdatedAt,
        };
      })
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
