import { IUser } from "./user.interface";

export interface ITag {
  id: number | string;
  name: string;
  body: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ITagObject {
  tagId: number;
  tagName: string;
  tagBody: string;
  tagCreatedAt: string;
  tagUpdatedAt: string;
}
