import Comment from "./comment.interface";

export default interface Solution {
  id: string;
  idTicket: string;

  titleProblem: string;
  problemTags: Array<string>;

  solutionComment: Comment;

  upVote: number;
  downVote: number;

  createdAt: Date;
}
