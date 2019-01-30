import { User } from '@shared/models/user';

export interface MovieModel {
  name: string;
  genre: string;
  released: Date;
  description: string;
  image?: string;
  addedBy: User;
}
