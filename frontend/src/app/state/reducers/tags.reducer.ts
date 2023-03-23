import { createReducer, on } from '@ngrx/store';
import { ITagsState } from 'src/app/shared/interfaces/ITag';
import * as TagsActions from '../actions/tags.actions';

export const initialState: ITagsState = {
  tags: [],
  tag: null,
  loading: false,
  loaded: false,
  error: '',
};

export const tagsReducer = createReducer(
  initialState,
  on(TagsActions.getTags, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(TagsActions.getTagsSuccess, (state, { tags }) => {
    return {
      ...state,
      loading: false,
      tags: [...tags],
    };
  }),
  on(TagsActions.getTagsFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }),
  on(TagsActions.getTagById, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(TagsActions.getTagByIdSuccess, (state, { tag }) => {
    return {
      ...state,
      loading: false,
      tag,
    };
  }),
  on(TagsActions.getTagByIdFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }),
  on(TagsActions.addTag, (state, { tag }) => {
    return {
      ...state,
      tags: [...state.tags, tag],
    };
  }),
  on(TagsActions.deleteTag, (state, { id }) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(TagsActions.deleteTagSuccess, (state, { id }) => {
    return {
      ...state,
      loading: false,
      tags: state.tags.filter((tag) => tag.id !== id),
    };
  }),
  on(TagsActions.deleteTagFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }),
  on(TagsActions.clearTags, (state) => {
    return {
      ...state,
      tags: [],
    };
  }),
  on(TagsActions.clearError, (state) => {
    return {
      ...state,
      error: '',
    };
  }),
  on(TagsActions.clearSuccess, (state) => {
    return {
      ...state,
      success: '',
    };
  })
);
