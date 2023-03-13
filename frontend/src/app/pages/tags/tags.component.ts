import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { SearchComponent } from 'src/app/components/search/search.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { TagComponent } from 'src/app/components/tag/tag.component';
import { delay, Observable, of, tap } from 'rxjs';
import { ITag } from 'src/app/shared/interfaces/ITag';
import { ProgressSpinnerComponent } from 'src/app/components/progress-spinner/progress-spinner.component';
import { tagFactory } from 'src/app/db';
import { FilterTagsPipe } from 'src/app/shared/pipes/tags-filter.pipe';
import { SortTagsPipe } from 'src/app/shared/pipes/tags-sort.pipe';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    MatFormFieldModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    SearchComponent,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatTabsModule,
    TagComponent,
    ProgressSpinnerComponent,
    FilterTagsPipe,
    SortTagsPipe,
  ],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit {
  loading: boolean = false;
  position: TooltipPosition = 'above';
  tags$?: Observable<ITag[]>;
  searchType: string = 'Name';
  searchTerm?: string;
  sortBy: string = 'Newest';

  tagCategories: {
    label: string;
    tagCategorie: string;
  }[] = [
    { label: 'Popular', tagCategorie: 'popular' },
    { label: 'Newest', tagCategorie: 'newest' },
    {
      label: 'Unanswered',
      tagCategorie: 'unanswered',
    },
  ];

  selectedTagCategory: number = this.tagCategories.findIndex(
    (tagCategory) => tagCategory.tagCategorie === 'popular'
  );

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // /tags?userId=1
    const userId = this.route.snapshot.queryParamMap.get('userId');
    if (userId) {
      this.getUserTags(+userId);
    }

    if (!userId) {
      this.getTags();
    }
  }

  ngOnChanges() {
    if (this.searchTerm) {
      this.searchTags(this.searchTerm);
    }
    this.sortBy = this.tagCategories[this.selectedTagCategory].label;
  }

  // TODO: Impliment infinite scroll pagination
  getTags() {
    this.loading = true;
    this.tags$ = of(tagFactory.buildList(50)).pipe(
      delay(500), // simulate delay
      tap(() => {
        this.loading = false;
      })
    );
  }

  getUserTags(userId: number) {
    console.log(`tags by userId:${userId}`);
    this.loading = true;
    this.tags$ = of(tagFactory.buildList(50)).pipe(
      delay(500), // simulate delay
      tap(() => {
        this.loading = false;
      })
    );
  }

  searchTags(searchTerm: string | undefined | null) {
    if(searchTerm) {
      console.log(`searching for tags with searchTerm: ${searchTerm}`);
      this.getTags(); // TODO: Impliment search
    }
  }
}
