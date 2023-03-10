import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ standalone: true, name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(content: string, length: number): string {
    if (content.length <= length) {
      return content;
    }

    const truncated = content.slice(0, length);
    return `${truncated}...`;
  }
}
