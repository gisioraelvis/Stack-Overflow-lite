import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SearchService } from './search.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  position: TooltipPosition = 'above';
  myControl = new FormControl();
  options: any[] = [];
  filteredOptions?: Observable<any[]>;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map((value) => this._filter(value))
    // );
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    // call the service that returns an observable of data
    this.searchService.getSearchResults(filterValue).subscribe((data) => {
      // assign the data to the options array
      this.options = data;
    });

    // return the filtered options
    return this.options.filter((option) =>
      option.product_name.toLowerCase().includes(filterValue)
    );
  }
}
