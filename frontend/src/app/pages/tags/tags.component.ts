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
import { Observable } from 'rxjs';
import { ITag } from 'src/app/shared/interfaces/ITag';
import { ProgressSpinnerComponent } from 'src/app/components/progress-spinner/progress-spinner.component';
import { FilterTagsPipe } from 'src/app/shared/pipes/tags-filter.pipe';
import { SortTagsPipe } from 'src/app/shared/pipes/tags-sort.pipe';
import { Store } from '@ngrx/store';
import * as tagsActions from 'src/app/state/actions/tags.actions';
import * as tagsSelectors from 'src/app/state/selectors/tags.selectors';
import * as SiteAnalyticsActions from 'src/app/state/actions/site-analytics.actions';
import * as SiteAnalyticsSelectors from 'src/app/state/selectors/admin-analytics.selectors';
import { NgxPaginationModule } from 'ngx-pagination';

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
    NgxPaginationModule,
  ],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit {
  loading: boolean = false;
  page: number = 1;
  itemsPerPage: number = 10;
  totalItems?: number;
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

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      tagsActions.getTags({
        page: this.page,
        itemsPerPage: this.itemsPerPage,
      })
    );

    this.store.select(tagsSelectors.getTagsLoading).subscribe((loading) => {
      this.loading = loading;
    });

    this.store
      .select(SiteAnalyticsSelectors.siteAnalytics)
      .subscribe((analytics) => {
        this.totalItems = analytics.totalTags;
      });

    this.store.dispatch(SiteAnalyticsActions.getSiteAnalytics());
    // /tags?userId=1
    const userId = this.route.snapshot.queryParamMap.get('userId');
    if (userId) {
      this.getUserTags(+userId);
    }

    if (!userId) {
      this.store.select(tagsSelectors.getTagsLoading).subscribe((loading) => {
        this.loading = loading;
      });

      this.store.dispatch(
        tagsActions.getTags({
          page: this.page,
          itemsPerPage: this.itemsPerPage,
        })
      );

      this.tags$ = this.store.select(tagsSelectors.tags);
    }
  }

  ngOnChanges() {
    if (this.searchTerm) {
      this.searchTags(this.searchTerm);
    }
    this.sortBy = this.tagCategories[this.selectedTagCategory].label;
  }

  getUserTags(userId: number | string) {
    this.store.select(tagsSelectors.getTagsLoading).subscribe((loading) => {
      this.loading = loading;
    });

    this.store.dispatch(
      tagsActions.getTagsByUser({
        userId: userId,
        pagination: { page: this.page, itemsPerPage: this.itemsPerPage },
      })
    );

    this.tags$ = this.store.select(tagsSelectors.tags);
  }

  searchTags(searchTerm: string | undefined | null) {
    if (searchTerm) {
      this.store.select(tagsSelectors.getTagsLoading).subscribe((loading) => {
        this.loading = loading;
      });

      this.store.dispatch(
        tagsActions.searchTags({
          searchTerm: searchTerm,
          page: this.page,
          itemsPerPage: this.itemsPerPage,
        })
      );

      this.tags$ = this.store.select(tagsSelectors.tags);
    }
  }

  onPageChange($event: number) {
    this.page = $event;

    this.store.select(tagsSelectors.getTagsLoading).subscribe((loading) => {
      this.loading = loading;
    });

    this.store.dispatch(
      tagsActions.getTags({
        page: this.page,
        itemsPerPage: this.itemsPerPage,
      })
    );

    this.tags$ = this.store.select(tagsSelectors.tags);
  }
}
