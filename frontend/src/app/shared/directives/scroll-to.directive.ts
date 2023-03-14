import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appToScroll]',
})
export class ScrollToDirective {
  @Input() appToScroll!: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.addEventListener('click', () => {
      // encode the element id with %HH format
      const encodedId = encodeURIComponent(this.appToScroll);
      const element = document.getElementById(encodedId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}

/* 
<div appToScroll="answer-123">
  <a href="#">View Answer</a>
</div>

<div id="answer-123">
  <p>This is the answer text</p>
</div>
*/
