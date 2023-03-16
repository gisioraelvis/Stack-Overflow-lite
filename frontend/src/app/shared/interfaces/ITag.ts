export interface ITag {
  id: number;
  name: string;
  body: string;
  questionsCount: number;
  userId: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}
