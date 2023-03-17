import { IUser } from "./user.interface";

export interface ITag {
  id: number;
  name: string;
  body: string;
  user: IUser;
  createdAt: string | Date;
  updatedAt: string | Date;
}
