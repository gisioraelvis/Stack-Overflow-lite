import { IComment } from './shared/interfaces/IComment';
import { IQuestion } from './shared/interfaces/IQuestion';
import { ITag } from './shared/interfaces/ITag';

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

export const TAGS: ITag[] = [
  {
    id: 1,
    name: 'angular',
    description:
      'Angular is a platform that makes it easy to build applications with the web. Angular combines declarative templates, dependency injection, end to end tooling, and integrated best practices to solve development challenges. Angular empowers developers to build applications that live on the web, mobile, or the desktop.',
    questionsCount: 0,
    createdAt: new Date(2023, 2, 9, 16, 0),
    updatedAt: new Date(2023, 2, 9, 16, 0),
  },
  {
    id: 2,
    name: 'react',
    description:
      'React is a JavaScript library for building user interfaces. React is maintained by Facebook, Instagram and a community of individual developers and companies.',
    questionsCount: 0,
    createdAt: new Date(2023, 2, 9, 16, 0),
    updatedAt: new Date(2023, 2, 9, 16, 0),
  },
  {
    id: 3,
    name: 'vue',
    description:
      'Vue.js (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries.',
    questionsCount: 0,
    createdAt: new Date(2023, 2, 9, 16, 0),
    updatedAt: new Date(2023, 2, 9, 16, 0),
  },
  {
    id: 4,
    name: 'material',
    description:
      'Material Design is a design language developed by Google. Material Design is inspired by the card-based layouts and transitions that are prevalent in modern mobile applications. It has the goal of providing a unified user experience across all their products on any platform.',
    questionsCount: 0,
    createdAt: new Date(2023, 2, 9, 16, 0),
    updatedAt: new Date(2023, 2, 9, 16, 0),
  },
  {
    id: 5,
    name: 'bootstrap',
    description:
      'Bootstrap is an open source toolkit for developing with HTML, CSS, and JS. Quickly prototype your ideas or build your entire app with our Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful plugins built on jQuery.',
    questionsCount: 0,
    createdAt: new Date(2023, 2, 9, 16, 0),
    updatedAt: new Date(2023, 2, 9, 16, 0),
  },
  {
    id: 6,
    name: 'installation',
    description:
      'Installation is the process of adding a software package to a computer system. In computing, an installation is the act of adding hardware or software to a computer or computing system. This is in contrast to upgrading, which refers to the process of replacing an existing version of software with a newer one.',
    questionsCount: 0,
    createdAt: new Date(2023, 2, 9, 16, 0),
    updatedAt: new Date(2023, 2, 9, 16, 0),
  },
  {
    id: 7,
    name: 'typescript',
    description:
      'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Any browser. Any host. Any OS. Open source.',
    questionsCount: 0,
    createdAt: new Date(2023, 2, 9, 16, 0),
    updatedAt: new Date(2023, 2, 9, 16, 0),
  },
  {
    id: 8,
    name: 'javascript',
    description:
      'JavaScript, often abbreviated as JS, is a high-level, interpreted programming language that conforms to the ECMAScript specification. JavaScript has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions. Alongside HTML and CSS, JavaScript is one of the three core technologies of the World Wide Web.',
    questionsCount: 0,
    createdAt: new Date(2023, 2, 9, 16, 0),
    updatedAt: new Date(2023, 2, 9, 16, 0),
  },
  {
    id: 9,
    name: 'html',
    description:
      'HTML is the standard markup language for creating Web pages. With Cascading Style Sheets (CSS) and JavaScript, it forms a triad of cornerstone technologies for the World Wide Web. Web browsers receive HTML documents from a webserver or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.',
    questionsCount: 0,
    createdAt: new Date(2023, 2, 9, 16, 0),
    updatedAt: new Date(2023, 2, 9, 16, 0),
  },
  {
    id: 10,
    name: 'css',
    description:
      'Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language like HTML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.',
    questionsCount: 0,
    createdAt: new Date(2023, 2, 9, 16, 0),
    updatedAt: new Date(2023, 2, 9, 16, 0),
  },
];
