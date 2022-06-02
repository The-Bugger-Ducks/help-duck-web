import Comment from "./comment.interface";

export interface Solution {
  id: string;
  idTicket: string;

  titleProblem: string;
  problem: {
    id: string;
    title: string;
  };

  solutionComment: Comment;

  upVote: number;
  downVote: number;

  createdAt: Date;
}

export interface CreateSolution {
  ticketId: string;

  titleProblem: string;
  problem: {
    id: string;
    title: string;
  };

  solutionComment: Comment;

}

export interface VoteSolution {
  solutionId: string;

  upVote: boolean;
  downVote: boolean;
}

