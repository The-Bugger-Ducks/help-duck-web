import User from "./user.interface"

export default interface Ticket {
  id: string
  title: string;
  description?: string;
  support: string;
  tags: Array<string>;
  priorityLevel?: "high" | "medium" | "low";
  status: "underAnalysis" | "waiting" | "notSolved" | "done",
  reserved: boolean,
  createdAt: Date,
  updatedAt: Date

  user: User
}
