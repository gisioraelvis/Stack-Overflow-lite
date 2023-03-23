import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITagsState } from 'src/app/shared/interfaces/ITag';

export const selectTagsState = createFeatureSelector<ITagsState>('tags');

export const tags = createSelector(
  selectTagsState,
  (state: ITagsState) => state.tags
);

export const getTagsLoading = createSelector(
  selectTagsState,
  (state: ITagsState) => state.loading
);

export const getTagsError = createSelector(
  selectTagsState,
  (state: ITagsState) => state.error
);

export const tag = createSelector(
  selectTagsState,
  (state: ITagsState) => state.tag
);

export const getTagLoading = createSelector(
  selectTagsState,
  (state: ITagsState) => state.loading
);

export const getTagError = createSelector(
  selectTagsState,
  (state: ITagsState) => state.error
);
