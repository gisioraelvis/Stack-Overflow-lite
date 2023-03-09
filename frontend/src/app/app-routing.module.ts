import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'questions',
    // loadComponent: () => import('./pages/questions/questions.component').then((c) => c.QuestionsComponent),
    loadComponent: () =>
      import('./components/place-holder/place-holder.component').then(
        (c) => c.PlaceHolderComponent
      ),
  },
  {
    path: 'questions/ask',
    // loadComponent: () => import('./pages/ask-question/ask-question.component').then((c) => c.AskQuestionComponent),
    loadComponent: () =>
      import('./components/place-holder/place-holder.component').then(
        (c) => c.PlaceHolderComponent
      ),
  },
  {
    path: 'tags',
    // loadComponent: () => import('./pages/tags/tags.component').then((c) => c.TagsComponent),
    loadComponent: () =>
      import('./components/place-holder/place-holder.component').then(
        (c) => c.PlaceHolderComponent
      ),
  },
  {
    path: 'users',
    // loadComponent: () => import('./pages/users/users.component').then((c) => c.UsersComponent),
    loadComponent: () =>
      import('./components/place-holder/place-holder.component').then(
        (c) => c.PlaceHolderComponent
      ),
  },
  {
    path: 'sign-in',
    // loadComponent: () => import('./pages/sign-in/sign-in.component').then((c) => c.SignInComponent),
    loadComponent: () =>
      import('./components/place-holder/place-holder.component').then(
        (c) => c.PlaceHolderComponent
      ),
  },
  {
    path: 'sign-up',
    // loadComponent: () => import('./pages/sign-up/sign-up.component').then((c) => c.SignUpComponent),
    loadComponent: () =>
      import('./components/place-holder/place-holder.component').then(
        (c) => c.PlaceHolderComponent
      ),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
    data: { message: 'Page not found!' },
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
