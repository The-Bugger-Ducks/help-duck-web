import Comment from "./comment.interface";

export interface Solution {
  id: string;
  idTicket: string;

  titleProblem: string;
  problemTags: Array<string>;

  solutionComment: Comment;

  upVote: number;
  downVote: number;

  createdAt: Date;
}

export interface CreateSolution {
  ticketId: string;

  titleProblem: string;
  problemTags: Array<string>;

  solutionComment: Comment;

}

