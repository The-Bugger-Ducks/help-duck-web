import { User } from "./user.interface";
import Comment from "./comment.interface";
import { Solution } from "./solution.interface";

export default interface Ticket {
  id: string;
  title: string;
  description: string;
  tags: Array<string>;
  priorityLevel: "high" | "medium" | "low";
  status: "underAnalysis" | "awaiting" | "done";
  reserved: boolean;
  createdAt: Date;
  updatedAt?: Date;
  department?: string;
  equipment?: string;

  user: User;
  support: User;
  comments: Array<Comment>;

  solution: Solution;
}
