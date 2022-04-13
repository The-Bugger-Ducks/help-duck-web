import {User} from "./user.interface"
import Comment from "./comment.interface"

export default interface Ticket {
  id: string
  title: string;
  description: string;
  tags: Array<string>;
  priorityLevel?: "high" | "medium" | "low";
  status?: "underAnalysis" | "waiting" | "notSolved" | "done",
  reserved: boolean,
  createdAt: Date,
  updatedAt?: Date,

  user: User,
  support: User,
  comments: Array<Comment>
}
