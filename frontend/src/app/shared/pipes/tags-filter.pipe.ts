import { Pipe, PipeTransform } from '@angular/core';
import { ITag } from '../interfaces/ITag';

@Pipe({
  name: 'filterTags',
})
export class FilterTagsPipe implements PipeTransform {
  transform(tags: ITag[], searchTerm: string, searchType: string): ITag[] {
    if (!searchTerm) {
      return tags;
    }

    searchTerm = searchTerm.toLowerCase();

    switch (searchType) {
      case 'Name':
        return tags.filter((tag) =>
          tag.name.toLowerCase().includes(searchTerm)
        );
      case 'Description':
        return tags.filter((tag) =>
          tag.description.toLowerCase().includes(searchTerm)
        );
      default:
        return tags;
    }
  }
}
