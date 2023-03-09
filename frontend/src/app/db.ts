import { IComment } from './shared/interfaces/IComment';
import { IQuestion } from './shared/interfaces/IQuestion';

export const QUESTIONS: IQuestion[] = [
  {
    id: 1,
    title: 'How to use RxJS with Angular?',
    description:
      'I want to learn how to use RxJS with Angular for reactive programming. What are some good resources or tutorials? I have already read the official documentation. But I am not sure how to use RxJS with Angular. I want to use RxJS with Angular in my project. How can I do that? I want to learn how to use RxJS with Angular for reactive programming. What are some good resources or tutorials? I have already read the official documentation. But I am not sure how to use RxJS with Angular. I want to use RxJS with Angular in my project. How can I do that?',
    tags: [
      {
        id: 1,
        name: 'angular',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
      {
        id: 2,
        name: 'rxjs',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
      {
        id: 3,
        name: 'reactive',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
    ],
    user: {
      id: 3,
      name: 'Bob Lee',
      avatar: 'assets/images/avatar.png',
    },
    upvotes: 5,
    downvotes: 2,
    answersCount: 2,
    time: new Date(2023, 2, 9, 16, 0),
  },
  {
    id: 2,
    title: 'How to use Angular Material?',
    description:
      'I am new to Angular and I want to use Angular Material for my project. How can I install and use it? I am using Angular CLI and I have already installed Angular Material. I have also imported the BrowserAnimationsModule in my app.module.ts file. But I am not sure how to use it. I want to use the Angular Material components in my project. How can I do that?',
    tags: [
      {
        id: 1,
        name: 'angular',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
      {
        id: 4,
        name: 'material',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
      {
        id: 5,
        name: 'installation',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
    ],
    user: {
      id: 1,
      name: 'John Doe',
      avatar: 'assets/images/avatar.png',
    },
    upvotes: 3,
    downvotes: 1,
    answersCount: 1,
    time: new Date(2023, 2, 9, 17, 0),
  },
  {
    id: 3,
    title: 'How to create a custom directive in Angular?',
    description:
      'I want to create a custom directive that can apply some logic and styling to any element. How can I do that? I have already created a directive using the Angular CLI. But I am not sure how to use it. I want to use the directive in my project. How can I do that? I want to apply some logic and styling to an element using the directive. How can I do that?',
    tags: [
      {
        id: 1,
        name: 'angular',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
      {
        id: 6,
        name: 'directive',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
      {
        id: 7,
        name: 'custom',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
    ],
    user: {
      id: 2,
      name: 'Jane Smith',
      avatar: 'assets/images/avatar.png',
    },
    upvotes: 2,
    downvotes: 1,
    answersCount: 0,
    time: new Date(2023, 2, 9, 16, 30),
  },
  {
    id: 4,
    title: 'How to use Angular CLI?',
    description:
      'I want to learn how to use Angular CLI. What are some good resources or tutorials? I have already read the official documentation. But I am not sure how to use Angular CLI. I want to use Angular CLI in my project. How can I do that? I want to learn how to use Angular CLI. What are some good resources or tutorials? I have already read the official documentation. But I am not sure how to use Angular CLI. I want to use Angular CLI in my project. How can I do that? I want to learn how to use Angular CLI. What are some good resources or tutorials? I have already read the official documentation. But I am not sure how to use Angular CLI. I want to use Angular CLI in my project. How can I do that? I want to learn how to use Angular CLI. What are some good resources or tutorials? I have already read the official documentation. But I am not sure how to use Angular CLI. I want to use Angular CLI in my project. How can I do that?',
    tags: [
      {
        id: 1,
        name: 'angular',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
      {
        id: 8,
        name: 'cli',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
      {
        id: 9,
        name: 'installation',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
    ],
    user: {
      id: 3,
      name: 'Bob Lee',
      avatar: 'assets/images/avatar.png',
    },
    upvotes: 1,
    downvotes: 0,
    answersCount: 0,
    time: new Date(2023, 2, 9, 16, 0),
  },
  {
    id: 5,
    title: 'How to use Angular Material?',
    description:
      'I am new to Angular and I want to use Angular Material for my project. How can I install and use it? I am using Angular CLI and I have already installed Angular Material. I have also imported the BrowserAnimationsModule in my app.module.ts file. But I am not sure how to use it. I want to use the Angular Material components in my project. How can I do that?',
    tags: [
      {
        id: 1,
        name: 'angular',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
      {
        id: 4,
        name: 'material',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
      {
        id: 5,
        name: 'installation',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
    ],
    user: {
      id: 1,
      name: 'John Doe',
      avatar: 'assets/images/avatar.png',
    },
    upvotes: 0,
    downvotes: 0,
    answersCount: 0,
    time: new Date(2023, 2, 9, 17, 0),
  },
  {
    id: 6,
    title: 'How to create a custom directive in Angular?',
    description:
      'I want to create a custom directive that can apply some logic and styling to any element. How can I do that? I have already created a directive using the Angular CLI. But I am not sure how to use it. I want to use the directive in my project. How can I do that? I want to apply some logic and styling to an element using the directive. How can I do that?',
    tags: [
      {
        id: 1,
        name: 'angular',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
      {
        id: 6,
        name: 'directive',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
      {
        id: 7,
        name: 'custom',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
    ],
    user: {
      id: 2,
      name: 'Jane Smith',
      avatar: 'assets/images/avatar.png',
    },
    upvotes: 0,
    downvotes: 0,
    answersCount: 0,
    time: new Date(2023, 2, 9, 16, 30),
  },
  {
    id: 7,
    title: 'How to use Angular CLI?',
    description:
      'I want to learn how to use Angular CLI. What are some good resources or tutorials? I have already read the official documentation. But I am not sure how to use Angular CLI. I want to use Angular CLI in my project. How can I do that? I want to learn how to use Angular CLI. What are some good resources or tutorials? I have already read the official documentation. But I am not sure how to use Angular CLI. I want to use Angular CLI in my project. How can I do that? I want to learn how to use Angular CLI. What are some good resources or tutorials? I have already read the official documentation. But I am not sure how to use Angular CLI. I want to use Angular CLI in my project. How can I do that? I want to learn how to use Angular CLI. What are some good resources or tutorials? I have already read the official documentation. But I am not sure how to use Angular CLI. I want to use Angular CLI in my project. How can I do that?',
    tags: [
      {
        id: 1,
        name: 'angular',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
      {
        id: 8,
        name: 'cli',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
      {
        id: 9,
        name: 'installation',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
    ],
    user: {
      id: 3,
      name: 'Bob Lee',
      avatar: 'assets/images/avatar.png',
    },
    upvotes: 0,
    downvotes: 0,
    answersCount: 0,
    time: new Date(2023, 2, 9, 16, 0),
  },
  {
    id: 8,
    title: 'How to use Angular Material?',
    description:
      'I am new to Angular and I want to use Angular Material for my project. How can I install and use it? I am using Angular CLI and I have already installed Angular Material. I have also imported the BrowserAnimationsModule in my app.module.ts file. But I am not sure how to use it. I want to use the Angular Material components in my project. How can I do that?',
    tags: [
      {
        id: 1,
        name: 'angular',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
      {
        id: 4,
        name: 'material',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
      {
        id: 5,
        name: 'installation',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
    ],
    user: {
      id: 1,
      name: 'John Doe',
      avatar: 'assets/images/avatar.png',
    },
    upvotes: 0,
    downvotes: 0,
    answersCount: 0,
    time: new Date(2023, 2, 9, 17, 0),
  },
  {
    id: 9,
    title: 'How to create a custom directive in Angular?',
    description:
      'I want to create a custom directive that can apply some logic and styling to any element. How can I do that? I have already created a directive using the Angular CLI. But I am not sure how to use it. I want to use the directive in my project. How can I do that? I want to apply some logic and styling to an element using the directive. How can I do that?',
    tags: [
      {
        id: 1,
        name: 'angular',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
      {
        id: 6,
        name: 'directive',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
      {
        id: 7,
        name: 'custom',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
    ],
    user: {
      id: 2,
      name: 'Jane Smith',
      avatar: 'assets/images/avatar.png',
    },
    upvotes: 0,
    downvotes: 0,
    answersCount: 0,
    time: new Date(2023, 2, 9, 16, 30),
  },
  {
    id: 10,
    title: 'How to use Angular CLI?',
    description:
      'I want to learn how to use Angular CLI. What are some good resources or tutorials? I have already read the official documentation. But I am not sure how to use Angular CLI. I want to use Angular CLI in my project. How can I do that? I want to learn how to use Angular CLI. What are some good resources or tutorials? I have already read the official documentation. But I am not sure how to use Angular CLI. I want to use Angular CLI in my project. How can I do that? I want to learn how to use Angular CLI. What are some good resources or tutorials? I have already read the official documentation. But I am not sure how to use Angular CLI. I want to use Angular CLI in my project. How can I do that? I want to learn how to use Angular CLI. What are some good resources or tutorials? I have already read the official documentation. But I am not sure how to use Angular CLI. I want to use Angular CLI in my project. How can I do that?',
    tags: [
      {
        id: 1,
        name: 'angular',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
      {
        id: 8,
        name: 'cli',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
      {
        id: 9,
        name: 'installation',
        createdAt: new Date(2023, 2, 9, 16, 0),
        updatedAt: new Date(2023, 2, 9, 16, 0),
      },
    ],
    user: {
      id: 3,
      name: 'Bob Lee',
      avatar: 'assets/images/avatar.png',
    },
    upvotes: 0,
    downvotes: 0,
    answersCount: 0,
    time: new Date(2023, 2, 9, 16, 0),
  },
];

export const COMMENTS: IComment[] = [
  {
    id: 1,
    text: 'This is a sample comment for the question with id 1 and title "How to use Angular Material?" and description "I am new to Angular and I want to use Angular Material for my project. How can I install and use it? I am using Angular CLI and I have already installed Angular Material. I have also imported the BrowserAnimationsModule in my app.module.ts file. But I am not sure how to use it. I want to use the Angular Material components in my project. How can I do that?" and tags "angular, material, installation" and user "John Doe" and upvotes 0 and downvotes 0 and answersCount 0 and time "2023-03-09T16:00:00.000Z".',
    user: {
      id: 1,
      name: 'Alice',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    text: 'This is another sample comment for the question with id 1 and title "How to use Angular Material?" and description "I am new to Angular and I want to use Angular Material for my project. How can I install and use it? I am using Angular CLI and I have already installed Angular Material. I have also imported the BrowserAnimationsModule in my app.module.ts file. But I am not sure how to use it. I want to use the Angular Material components in my project. How can I do that?" and tags "angular, material, installation" and user "John Doe" and upvotes 0 and downvotes 0 and answersCount 0 and time "2023-03-09T16:00:00.000Z".',
    user: {
      id: 2,
      name: 'Bob',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    text: 'This is a sample comment for the question with id 2 and title "How to use Angular Material?" and description "I am new to Angular and I want to use Angular Material for my project. How can I install and use it? I am using Angular CLI and I have already installed Angular Material. I have also imported the BrowserAnimationsModule in my app.module.ts file. But I am not sure how to use it. I want to use the Angular Material components in my project. How can I do that?" and tags "angular, material, installation" and user "John Doe" and upvotes 0 and downvotes 0 and answersCount 0 and time "2023-03-09T16:00:00.000Z".',
    user: {
      id: 3,
      name: 'Charlie',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    text: 'This is a sample comment for the question with id 3 and title "How to use Angular Material?" and description "I am new to Angular and I want to use Angular Material for my project. How can I install and use it? I am using Angular CLI and I have already installed Angular Material. I have also imported the BrowserAnimationsModule in my app.module.ts file. But I am not sure how to use it. I want to use the Angular Material components in my project. How can I do that?" and tags "angular, material, installation" and user "John Doe" and upvotes 0 and downvotes 0 and answersCount 0 and time "2023-03-09T16:00:00.000Z".',
    user: {
      id: 4,
      name: 'David',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    text: 'This is a sample comment for the question with id 4 and title "How to use Angular Material?" and description "I am new to Angular and I want to use Angular Material for my project. How can I install and use it? I am using Angular CLI and I have already installed Angular Material. I have also imported the BrowserAnimationsModule in my app.module.ts file. But I am not sure how to use it. I want to use the Angular Material components in my project. How can I do that?" and tags "angular, material, installation" and user "John Doe" and upvotes 0 and downvotes 0 and answersCount 0 and time "2023-03-09T16:00:00.000Z".',
    user: {
      id: 5,
      name: 'Eve',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
