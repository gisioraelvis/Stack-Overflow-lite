import { Pipe, PipeTransform } from '@angular/core';
import { ITag } from '../interfaces/ITag';

@Pipe({
  standalone: true,
  name: 'sortTags',
})
export class SortTagsPipe implements PipeTransform {
  transform(tags: ITag[], sortBy: string): ITag[] {
    // console.log(`SortTagsPipe - sortBy: ${sortBy}`);
    if (!tags || tags.length === 0 || !sortBy) {
      return tags;
    }

    let sortedTags = [...tags];

    switch (sortBy) {
      case 'Name (A-Z)':
        return sortedTags.sort((a, b) => a.name.localeCompare(b.name));
      case 'Name (Z-A)':
        return sortedTags.sort((a, b) => b.name.localeCompare(a.name));
      case 'Newest':
        return sortedTags.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'Most Used':
        return sortedTags.sort((a, b) => b.totalQuestions - a.totalQuestions);
      default:
        return sortedTags;
    }
  }
}
