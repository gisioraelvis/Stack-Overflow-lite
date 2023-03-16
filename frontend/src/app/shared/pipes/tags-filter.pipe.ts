import { Pipe, PipeTransform } from '@angular/core';
import { ITag } from '../interfaces/ITag';

@Pipe({
  standalone: true,
  name: 'filterTags',
})
export class FilterTagsPipe implements PipeTransform {
  transform(
    tags: ITag[],
    searchType: string | null | undefined,
    searchTerm: string | null | undefined
  ): ITag[] {
    // console.log(`FilterTagsPipe - searchType: ${searchType}, searchTerm: ${searchTerm}`)
    if (!searchTerm || !searchType) {
      return tags;
    }

    searchTerm = searchTerm.toLowerCase();

    switch (searchType) {
      case 'Name':
        return tags.filter((tag) =>
          tag.name.toLowerCase().includes(searchTerm!)
        );
      case 'body':
        return tags.filter((tag) =>
          tag.body.toLowerCase().includes(searchTerm!)
        );
      default:
        return tags;
    }
  }
}
