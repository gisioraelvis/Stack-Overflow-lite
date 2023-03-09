import { IComment } from './shared/interfaces/IComment';
import { IQuestion } from './shared/interfaces/IQuestion';

export const QUESTIONS: IQuestion[] = [
  {
    id: 1,
    title: 'How to use Angular Material?',
    description:
      'I am new to Angular and I want to use Angular Material for my project. How can I install and use it?',
    tags: ['angular', 'material', 'installation'],
    user: {
      id: 1,
      name: 'John Doe',
      avatar: 'assets/images/avatar.png',
    },
    time: new Date(2023, 2, 9, 17, 0),
  },
  {
    id: 2,
    title: 'How to create a custom directive in Angular?',
    description:
      'I want to create a custom directive that can apply some logic and styling to any element. How can I do that?',
    tags: ['angular', 'directive', 'custom'],
    user: {
      id: 2,
      name: 'Jane Smith',
      avatar: 'assets/images/avatar.png',
    },
    time: new Date(2023, 2, 9, 16, 30),
  },
  {
    id: 3,
    title: 'How to use RxJS with Angular?',
    description:
      'I want to learn how to use RxJS with Angular for reactive programming. What are some good resources or tutorials?',
    tags: ['angular', 'rxjs', 'reactive'],
    user: {
      id: 3,
      name: 'Bob Lee',
      avatar: 'assets/images/avatar.png',
    },
    time: new Date(2023, 2, 9, 16, 0),
  },
];

export const COMMENTS: IComment[] = [
  {
    id: 1,
    text: 'This is a sample comment.',
    user: {
      id: 1,
      name: 'Alice',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    time: new Date(),
    upvotes: 3,
    downvotes: 0,
  },
  {
    id: 2,
    text: 'This is another sample comment.',
    user: {
      id: 2,
      name: 'Bob',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    time: new Date(),
    upvotes: 2,
    downvotes: 1,
  },
];
