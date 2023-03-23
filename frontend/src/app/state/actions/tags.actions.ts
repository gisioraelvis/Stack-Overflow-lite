import { createAction, props } from '@ngrx/store';
import { IPagination } from 'src/app/shared/interfaces/shared';
import { IDeleteSuccess, ITag } from 'src/app/shared/interfaces/ITag';

export const getTags = createAction('[Tags] Get Tags', props<IPagination>());

export const getTagsSuccess = createAction(
  '[Tags] Get Tags Success',
  props<{ tags: ITag[] }>()
);

export const getTagsFailure = createAction(
  '[Tags] Get Tags Failure',
  props<{ error: string }>()
);

export const getTagById = createAction(
  '[Tags] Get Tag',
  props<{ id: number | string }>()
);

export const getTagByIdSuccess = createAction(
  '[Tags] Get Tag Success',
  props<{ tag: ITag }>()
);

export const getTagByIdFailure = createAction(
  '[Tags] Get Tag Failure',
  props<{ error: string }>()
);

export const addTag = createAction('[Tags] Add Tag', props<{ tag: ITag }>());

export const searchTags = createAction(
  '[Tags] Search Tags',
  props<{
    searchTerm: string | undefined | null;
    page: number;
    itemsPerPage: number;
  }>()
);

export const searchTagsSuccess = createAction(
  '[Tags] Search Tags Success',
  props<{ tags: ITag[] }>()
);

export const searchTagsFailure = createAction(
  '[Tags] Search Tags Failure',
  props<{ error: string }>()
);

export const getTagsByUser = createAction(
  '[Tags] Get User Tags',
  props<{ userId: string | number; pagination: IPagination }>()
);

export const getTagsByUserSuccess = createAction(
  '[Tags] Get User Tags Success',
  props<{ tags: ITag[] }>()
);

export const getTagsByUserFailure = createAction(
  '[Tags] Get User Tags Failure',
  props<{ error: string }>()
);

export const createTag = createAction(
  '[Tags] Create Tag',
  props<{ tag: ITag }>()
);

export const createTagSuccess = createAction(
  '[Tags] Create Tag Success',
  props<{ tag: ITag }>()
);

export const createTagFailure = createAction(
  '[Tags] Create Tag Failure',
  props<{ error: string }>()
);

export const updateTag = createAction(
  '[Tags] Update Tag',
  props<{ tag: ITag }>()
);

export const updateTagSuccess = createAction(
  '[Tags] Update Tag Success',
  props<{ tag: ITag }>()
);

export const updateTagFailure = createAction(
  '[Tags] Update Tag Failure',
  props<{ error: string }>()
);

export const deleteTag = createAction(
  '[Tags] Delete Tag',
  props<{ id: string | number }>()
);

export const deleteTagSuccess = createAction(
  '[Tags] Delete Tag Success',
  props<IDeleteSuccess>()
);

export const deleteTagFailure = createAction(
  '[Tags] Delete Tag Failure',
  props<{ error: string }>()
);

export const clearTags = createAction('[Tags] Clear Tags');
export const clearError = createAction('[Tags] Clear Error');
export const clearSuccess = createAction('[Tags] Clear Success');
