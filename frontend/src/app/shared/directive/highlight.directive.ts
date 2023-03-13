import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input('appHighlight') searchQuery!: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.searchQuery && this.searchQuery.trim()) {
      const content = this.el.nativeElement.textContent;
      const regex = new RegExp(this.searchQuery, 'gi');
      const match = content.match(regex);
      if (match && match.length > 0) {
        const highlightedContent = content.replace(
          regex,
          `<span class="highlight">${match[0]}</span>`
        );
        this.el.nativeElement.innerHTML = highlightedContent;
      }
    }
  }
}

// <div appHighlight="{{ searchQuery }}">Search result containing the search query</div>
