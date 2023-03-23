import { IPagination } from './IPagination';

export interface ITag {
  id: number;
  name: string;
  body: string;
  userId: number;
  totalQuestions: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ITagsState {
  tags: ITag[];
  tag: ITag | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface ITagSearch {
  searchTerm: string | undefined | null;
  pagination: IPagination;
}

export interface ITagByUser {
  userId: string;
  pagination: IPagination;
}

export interface ITagUpdate {
  id: number;
  name: string;
  body: string;
}

export interface ITagCreate {
  name: string;
  body: string;
}

export interface IDeleteSuccess {
  id: number;
  message: string;
}
