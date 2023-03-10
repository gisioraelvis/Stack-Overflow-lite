import { Component, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, NgxPaginationModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent {
  // Input properties for total items and page size
  @Input() totalItems?: number;
  @Input() pageSize?: number;

  // Output event for page change
  pageChange = new EventEmitter<number>();

  // Current page index
  pageIndex = 0;

  // TODO: Update the page items
  // Handle page event from material paginator
  onPageEvent(event: PageEvent) {
    // Update page index
    this.pageIndex = event.pageIndex;
    // Emit page change event with new page number
    this.pageChange.emit(event.pageIndex + 1);
    console.log(event);
  }
}
