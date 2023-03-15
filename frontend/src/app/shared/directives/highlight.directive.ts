import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appSearchHighlight]',
})
export class HighlightDirective {
  @Input('appSearchHighlight') searchQuery: string | undefined | null;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    // console.log(`HighlightDirective - highlight: ${this.searchQuery}`);
    if (this.searchQuery && this.searchQuery.trim()) {
      const content = this.el.nativeElement.textContent;
      const regex = new RegExp(this.searchQuery, 'gi');
      const match = content.match(regex);
      if (match && match.length > 0) {
        const highlightedContent = content.replace(
          regex,
          `<ng-container class="highlight">${match[0]}</ng-container>`
        );
        this.el.nativeElement.innerHTML = highlightedContent;
      }
    } else {
      // searchQuery is empty, remove all highlight classes
      const highlightedElements =
        this.el.nativeElement.querySelectorAll('.highlight');
      highlightedElements.forEach((element: HTMLElement) => {
        element.classList.remove('highlight');
      });
    }
  }
}

// <div appSearchHighlight="{{ searchQuery }}">Search result containing the search query</div>
