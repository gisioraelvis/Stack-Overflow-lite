export interface ITag {
  id: number;
  name: string;
  description: string;
  questionsCount: number;
  userId: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}
