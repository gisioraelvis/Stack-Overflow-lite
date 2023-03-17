export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  password: string;
  isDeleted?: boolean;
  isAdmin: boolean;
}
