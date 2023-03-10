import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ standalone: true, name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, length: number): string {
    if (value.length <= length) {
      return value;
    }

    const truncated = value.slice(0, length);
    return `${truncated}...`;
  }
}
