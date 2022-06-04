export interface Problem {
  count: number;
  createdAt: Date;
  id: string;
  links: {
    empty: boolean;
  };
  solutionList: Array<ProblemSolution>;
  title: string;
}

export interface ProblemSolution {
  description: string;
  title: string;
}

export interface SetProblemSolutionAdd {
  description: string;
  title: string;
  problemId: string;
}
