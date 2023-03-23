import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../interfaces/IUser';

@Pipe({
  standalone: true,
  name: 'sortUsers',
})
export class SortUsersPipe implements PipeTransform {
  transform(users: IUser[], sortBy: string): IUser[] {
    if (!users || users.length === 0 || !sortBy) {
      return users;
    }

    let sortedUsers = [...users];

    switch (sortBy) {
      case 'Username (A-Z)':
        return sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
      case 'Username (Z-A)':
        return sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
      case 'Newest':
        return sortedUsers.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'Most Questions Asked':
        return sortedUsers.sort(
          (a, b) =>
            b.userAnalytics.totalQuestions - a.userAnalytics.totalQuestions
        );
      case 'Most Answers Given':
        return sortedUsers.sort(
          (a, b) => b.userAnalytics.totalAnswers - a.userAnalytics.totalAnswers
        );
      default:
        return sortedUsers;
    }
  }
}
