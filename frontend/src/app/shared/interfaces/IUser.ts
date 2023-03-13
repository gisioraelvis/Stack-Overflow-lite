export interface IUser {
  id: number;
  name: string;
  avatar: string;
  questionsCount: number;
  answersCount: number;
  tagsCount: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}
