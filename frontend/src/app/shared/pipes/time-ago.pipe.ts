import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(dateTimeString: Date | string, args?: any): any {
    const seconds = Math.floor(
      (+new Date() - +new Date(dateTimeString)) / 1000
    );

    if (seconds < 60) {
      return 'just now';
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      if (minutes === 1) {
        return 'a minute ago';
      } else {
        return minutes + ' minutes ago';
      }
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      if (hours === 1) {
        return 'an hour ago';
      } else {
        return hours + ' hours ago';
      }
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
      if (days === 1) {
        return 'a day ago';
      } else {
        return days + ' days ago';
      }
    }

    const weeks = Math.floor(days / 7);
    if (weeks < 4) {
      if (weeks === 1) {
        return 'a week ago';
      } else {
        return weeks + ' weeks ago';
      }
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
      if (months === 1) {
        return 'a month ago';
      } else {
        return months + ' months ago';
      }
    }

    const years = Math.floor(months / 12);
    if (years === 1) {
      return 'a year ago';
    }

    return years + ' years ago';
  }
}
