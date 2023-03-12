import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../interfaces/IUser';

@Pipe({
  name: 'filterUsers',
})
export class FilterUsersPipe implements PipeTransform {
  transform(users: IUser[], searchTerm: string): IUser[] {
    if (!searchTerm) {
      return users;
    }

    searchTerm = searchTerm.toLowerCase();

    return users.filter((user) => user.name.toLowerCase().includes(searchTerm));
  }
}
