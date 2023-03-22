import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';
import { IComment } from './shared/interfaces/IComment';
import { IQuestion } from './shared/interfaces/IQuestion';
import { ITag } from './shared/interfaces/ITag';
import { IUser } from './shared/interfaces/IUser';
import { IAnswer } from './shared/interfaces/IAnswer';
import { ISiteAnalytics } from './shared/interfaces/IAnalytics';

export interface IFUser {
  id: number;
  name: string;
  avatar: string;
  questionsCount: number;
  answersCount: number;
  tagsCount: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

// Users
export const userFactory = Factory.Sync.makeFactory<IUser>({
  id: Factory.each((i) => i),
  name: Factory.each(() => faker.name.fullName()),
  email: Factory.each(() => faker.internet.email()),
  avatar: Factory.each(() => faker.image.avatar()),
  isAdmin: false,
  isDeleted: false,
  bio: Factory.each(() => faker.lorem.sentence()),
  JWT: Factory.each(() => faker.datatype.uuid()),
  createdAt: Factory.each(() => faker.date.between('2023-01-01', '2023-03-31')),
  updatedAt: Factory.each(() => faker.date.between('2023-01-01', '2023-03-31')),
});

// Tags
export const tagFactory = Factory.Sync.makeFactory<ITag>({
  id: Factory.each(() => faker.datatype.number()),
  name: Factory.each(() => faker.lorem.word()),
  body: Factory.each(() => faker.lorem.sentence()),
  questionsCount: Factory.each(() => faker.datatype.number()),
  userId: Factory.each(() => faker.datatype.number()),
  createdAt: Factory.each(() => faker.date.between('2023-01-01', '2023-03-31')),
  updatedAt: Factory.each(() => faker.date.between('2023-01-01', '2023-03-31')),
});

// Questions
export const questionFactory = Factory.Sync.makeFactory<IQuestion>({
  id: Factory.each((i) => i + 1),
  title: Factory.each(() =>
    faker.lorem.sentence(faker.datatype.number({ min: 7, max: 10 }))
  ),
  body: Factory.each(() => faker.lorem.paragraph(100)),
  user: Factory.each(() => userFactory.build()),
  upvotes: Factory.each(() => faker.datatype.number({ min: 0, max: 50 })),
  downvotes: Factory.each(() => faker.datatype.number({ min: 0, max: 50 })),
  answersCount: Factory.each(() => faker.datatype.number({ min: 0, max: 20 })),
  updatedAt: Factory.each(() => faker.date.between('2023-01-01', '2023-03-31')),
  createdAt: Factory.each(() => faker.date.between('2023-01-01', '2023-03-31')),
  tags: Factory.each(() => {
    const tags = [];
    for (let i = 0; i < faker.datatype.number({ min: 1, max: 5 }); i++) {
      tags.push(tagFactory.build());
    }
    return tags;
  }),
  comments: Factory.each(() => {
    const comments = [];
    for (let i = 0; i < faker.datatype.number({ min: 0, max: 5 }); i++) {
      comments.push(commentFactory.build());
    }
    return comments;
  }),
  answers: Factory.each(() => {
    const answers = [];
    for (let i = 0; i < faker.datatype.number({ min: 0, max: 5 }); i++) {
      answers.push(answerFactory.build());
    }
    return answers;
  }),
});

// Comments
export const commentFactory = Factory.Sync.makeFactory<IComment>({
  id: Factory.each(() => faker.datatype.number()),
  body: Factory.each(() => faker.lorem.paragraph()),
  user: Factory.each(() => userFactory.build()),
  createdAt: Factory.each(() => faker.date.between('2023-01-01', '2023-03-31')),
  updatedAt: Factory.each(() => faker.date.between('2023-01-01', '2023-03-31')),
  questionId: Factory.each(() => faker.datatype.number()),
  answerId: Factory.each(() => faker.datatype.number()),
});

// Answers
export const answerFactory = Factory.Sync.makeFactory<IAnswer>({
  id: Factory.each(() => faker.datatype.number()),
  body: Factory.each(() => faker.lorem.paragraph(50)),
  user: Factory.each(() => userFactory.build()),
  isAccepted: Factory.each(() => faker.datatype.boolean()),
  upvotes: Factory.each(() => faker.datatype.number({ min: 0, max: 50 })),
  downvotes: Factory.each(() => faker.datatype.number({ min: 0, max: 50 })),
  createdAt: Factory.each(() => faker.date.between('2023-01-01', '2023-03-31')),
  updatedAt: Factory.each(() => faker.date.between('2023-01-01', '2023-03-31')),
  comments: Factory.each(() => {
    const comments = [];
    for (let i = 0; i < faker.datatype.number({ min: 0, max: 5 }); i++) {
      comments.push(commentFactory.build());
    }
    return comments;
  }),
});

// Analytics
export const analyticsFactory = Factory.Sync.makeFactory<ISiteAnalytics>({
  totalUsers: Factory.each(() => faker.datatype.number()),
  totalQuestions: Factory.each(() => faker.datatype.number()),
  totalAnswers: Factory.each(() => faker.datatype.number()),
  totalComments: Factory.each(() => faker.datatype.number()),
  totalTags: Factory.each(() => faker.datatype.number()),
  totalVotes: Factory.each(() => faker.datatype.number()),
});
