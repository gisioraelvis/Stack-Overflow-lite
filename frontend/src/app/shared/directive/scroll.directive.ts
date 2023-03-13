import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appScroll]',
})
export class ScrollDirective {
  @Input() appScroll!: string;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    const element = this.elementRef.nativeElement.querySelector(
      `#${this.appScroll}`
    );
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

/* 
<div appScroll="answer-123">
  <a href="#">View Answer</a>
</div>

<div id="answer-123">
  <p>This is the answer text</p>
</div>

*/
