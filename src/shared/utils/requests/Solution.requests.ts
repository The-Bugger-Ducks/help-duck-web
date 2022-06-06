import { apiSolution } from '../../services/Api.service';

import { SOLUTION_ENDPOINTS } from '../endpoints';
import {
  CreateSolution,
  Solution,
  VoteSolution,
} from '../../interfaces/solution.interface';
import { validateStatus } from '../handlers/HandlerResponseStatusCodeFound';

export class SolutionRequests {
  public async setSolutionTicket(solution: CreateSolution) {
    try {
      const { data } = await apiSolution.post(
        SOLUTION_ENDPOINTS.SOLUTION_CREATE,
        solution
      );

      const solutionResponse: Solution = data;
      return solutionResponse;
    } catch (error) {
      console.log(error);
      alert('Não foi possível definir a solução do chamado, tente novamente!');
    }
  }

  public async incrementVoteSolution(vote: VoteSolution) {
    try {
      return await apiSolution.post(SOLUTION_ENDPOINTS.SOLUTION_VOTE, vote);
    } catch (error) {
      console.log(error);
      alert('Não foi possível adicionar voto, tente novamente!');
    }
  }

  public async searchSolutionByKeyword(keyword: string, sorting?: string) {
    let url = SOLUTION_ENDPOINTS.SOLUTION_SEARCH + keyword;
    if (sorting !== undefined) {
      url += `?${sorting}`;
    }

    const { data } = await apiSolution.get(url, {
      validateStatus,
    });

    return data;
  }
}
