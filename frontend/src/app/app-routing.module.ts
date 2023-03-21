import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { CanDeactiveService } from './core/guards/can-deactive.service';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'questions',
    loadComponent: () =>
      import('./pages/questions/questions.component').then(
        (c) => c.QuestionsComponent
      ),
  },
  {
    path: 'questions/ask',
    loadComponent: () =>
      import('./pages/ask-question/ask-question.component').then(
        (c) => c.AskQuestionComponent
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'questions/:id',
    loadComponent: () =>
      import('./pages/question/question.component').then(
        (c) => c.QuestionComponentPage
      ),
  },
  {
    path: 'questions/tagged/:tag-name',
    // loadComponent: () => import('./pages/questions/questions.component').then((c) => c.QuestionsComponent),
    loadComponent: () =>
      import('./pages/place-holder/place-holder.component').then(
        (c) => c.PlaceHolderComponent
      ),
  },
  {
    path: 'tags',
    loadComponent: () =>
      import('./pages/tags/tags.component').then((c) => c.TagsComponent),
  },
  ///tags/add
  {
    path: 'tags/add',
    // loadComponent: () => import('./pages/add-tag/add-tag.component').then((c) => c.AddTagComponent),
    loadComponent: () =>
      import('./pages/place-holder/place-holder.component').then(
        (c) => c.PlaceHolderComponent
      ),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users/users.component').then((c) => c.UsersComponent),
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./pages/sign-in/sign-in.component').then(
        (c) => c.SignInComponent
      ),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./pages/sign-up/sign-up.component').then(
        (c) => c.SignUpComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/user-dashboard/user-dashboard.component').then(
        (c) => c.UserDashboardComponent
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'dashboard/edit-profile',
    canDeactivate: [CanDeactiveService],
    loadComponent: () =>
      import('./pages/update-profile/update-profile.component').then(
        (c) => c.UpdateProfileComponent
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/forgot-password/forgot-password.component').then(
        (c) => c.ForgotPasswordComponent
      ),
  },
  // reset-password/?token=token
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./pages/password-reset/password-reset.component').then(
        (c) => c.PasswordResetComponent
      ),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin-dashboard/admin-dashboard.component').then(
        (c) => c.AdminDashboardComponent
      ),
    canActivate: [AuthGuardService],
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
