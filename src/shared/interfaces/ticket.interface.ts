import { User } from "./user.interface";
import Comment from "./comment.interface";
import { Solution } from "./solution.interface";
import { Equipment } from "./equipment.interface";

export default interface Ticket {
  id: string;
  title: string;
  description: string;
  problems: {
    id: string;
    title: string;
  };
  priorityLevel: 'high' | 'medium' | 'low';
  status: 'underAnalysis' | 'awaiting' | 'done';
  reserved: boolean;
  createdAt: Date;
  updatedAt?: Date;
  concludedAt?: Date;
  department?: string;
  equipment?: Equipment;

  user: User;
  support: User;
  comments: Array<Comment>;

  solution: Solution;
}
