import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../interfaces/IUser';

@Pipe({
  name: 'sortUsers',
})
export class SortUsersPipe implements PipeTransform {
  transform(users: IUser[], sortBy: string): IUser[] {
    if (!sortBy) {
      return users;
    }

    switch (sortBy) {
      case 'Username (A-Z)':
        return users.sort((a, b) => a.name.localeCompare(b.name));
      case 'Username (Z-A)':
        return users.sort((a, b) => b.name.localeCompare(a.name));
      case 'Newest':
        return users.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'Most Questions Asked':
        return users.sort((a, b) => b.questionsCount - a.questionsCount);
      case 'Most Answers Given':
        return users.sort((a, b) => b.answersCount - a.answersCount);
      default:
        return users;
    }
  }
}
