import { Pipe, PipeTransform } from '@angular/core';
import { ITag } from '../interfaces/ITag';

@Pipe({
  standalone: true,
  name: 'sortTags',
})
export class SortTagsPipe implements PipeTransform {
  transform(tags: ITag[], sortBy: string): ITag[] {
    // console.log(`SortTagsPipe - sortBy: ${sortBy}`);
    if (!sortBy) {
      return tags;
    }

    switch (sortBy) {
      case 'Name (A-Z)':
        return tags.sort((a, b) => a.name.localeCompare(b.name));
      case 'Name (Z-A)':
        return tags.sort((a, b) => b.name.localeCompare(a.name));
      case 'Newest':
        return tags.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'Most Used':
        return tags.sort((a, b) => b.questionsCount - a.questionsCount);
      default:
        return tags;
    }
  }
}
