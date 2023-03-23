import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import * as TagsActions from '../actions/tags.actions';
import { TagsService } from 'src/app/pages/tags/tags.service';
import { IDeleteSuccess, ITag } from 'src/app/shared/interfaces/ITag';

@Injectable()
export class TagsEffects {
  constructor(private actions$: Actions, private tagsService: TagsService) {}

  getTags$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TagsActions.getTags),
      mergeMap((action) => {
        const { page, itemsPerPage } = action;
        return this.tagsService.getTags({ page, itemsPerPage }).pipe(
          map((successResponse: ITag[]) => {
            return TagsActions.getTagsSuccess({
              tags: successResponse,
            });
          }),
          catchError((error) => of(TagsActions.getTagsFailure({ error })))
        );
      })
    );
  });

  getTagById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TagsActions.getTagById),
      mergeMap((action) => {
        const { id } = action;
        return this.tagsService.getTagById(id).pipe(
          map((successResponse: ITag) => {
            return TagsActions.getTagByIdSuccess({
              tag: successResponse,
            });
          }),
          catchError((error) => of(TagsActions.getTagByIdFailure({ error })))
        );
      })
    );
  });

  createTag$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TagsActions.createTag),
      mergeMap((action) => {
        const { tag } = action;
        return this.tagsService.createTag(tag).pipe(
          map((successResponse: ITag) => {
            return TagsActions.createTagSuccess({
              tag: successResponse,
            });
          }),
          catchError((error) => of(TagsActions.createTagFailure({ error })))
        );
      })
    );
  });

  searchTags$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TagsActions.searchTags),
      mergeMap((action) => {
        const { searchTerm, page, itemsPerPage } = action;
        return this.tagsService
          .searchTags({ searchTerm, pagination: { page, itemsPerPage } })
          .pipe(
            map((successResponse: ITag[]) => {
              return TagsActions.searchTagsSuccess({
                tags: successResponse,
              });
            }),
            catchError((error) => of(TagsActions.searchTagsFailure({ error })))
          );
      })
    );
  });

  updateTag$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TagsActions.updateTag),
      mergeMap((action) => {
        const { tag } = action;
        return this.tagsService.updateTag(tag).pipe(
          map((successResponse: ITag) => {
            return TagsActions.updateTagSuccess({
              tag: successResponse,
            });
          }),
          catchError((error) => of(TagsActions.updateTagFailure({ error })))
        );
      })
    );
  });

  deleteTag$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TagsActions.deleteTag),
      mergeMap((action) => {
        const { id } = action;
        return this.tagsService.deleteTag(id).pipe(
          map((successResponse: IDeleteSuccess) => {
            const { id, message } = successResponse;
            return TagsActions.deleteTagSuccess({
              id,
              message,
            });
          }),
          catchError((error) => of(TagsActions.deleteTagFailure({ error })))
        );
      })
    );
  });
}
