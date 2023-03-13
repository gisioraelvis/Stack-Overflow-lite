import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appConfirm]',
})
export class ConfirmDirective {
  @Input() appConfirm: string = 'Are you sure?';

  constructor() {}

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.preventDefault();
    const confirmed = window.confirm(this.appConfirm);
    if (confirmed) {
      // perform the specified action
    }
  }
}

// <button appConfirm="Are you sure you want to delete this question?" (click)="deleteQuestion()">Delete Question</button>
