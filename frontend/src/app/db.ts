import { IQuestion } from './shared/interfaces/IQuestion';

export const QUESTIONS: IQuestion[] = [
  {
    id: 1,
    title: 'How to use Angular Material?',
    description:
      'I am new to Angular and I want to use Angular Material for my project. How can I install and use it?',
    tags: ['angular', 'material', 'installation'],
    user: {
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
      name: 'Bob Lee',
      avatar: 'assets/images/avatar.png',
    },
    time: new Date(2023, 2, 9, 16, 0),
  },
];
