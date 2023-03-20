import { IUser } from "./user.interface";

export interface ITag {
  id: number | string;
  name: string;
  body: string;
  userId: number | string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ITagObject {
  tagId: number;
  tagUserId: number;
  tagName: string;
  tagBody: string;
  tagCreatedAt: string;
  tagUpdatedAt: string;
}
