/* export interface IUser {
  id: number;
  name: string;
  avatar: string;
  questionsCount: number;
  answersCount: number;
  tagsCount: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}
 */

export interface IUser {
  id: string | number;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  password?: string;
  isDeleted?: boolean;
  isAdmin: boolean;
  updatedAt: Date | string;
  createdAt: Date | string;
  questionsCount?: number;
  answersCount?: number;
  tagsCount?: number;
}
