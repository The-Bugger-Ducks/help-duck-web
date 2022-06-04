import { apiSolution } from '../../services/Api.service';

import { PROBLEM_ENDPOINTS } from '../endpoints';
import { Problem, SetProblemSolutionAdd } from '../../interfaces/problem.interface';
import {
  validateStatus,
  handleResponseStatus,
} from '../handlers/HandlerProblemResponseStatusCode';

export class ProblemRequests {
  public async getProblems() {
    const response = await apiSolution.get(PROBLEM_ENDPOINTS.PROBLEM_LIST, {
      validateStatus,
    });

    return handleResponseStatus(response);
  }

  public async getProblem(problemId: String) {
    try {
      const response = await apiSolution.get(
        PROBLEM_ENDPOINTS.PROBLEM_DETAILS + problemId,
        {
          validateStatus,
        }
      );

      return handleResponseStatus(response);
    } catch (error) {
      console.log(error);
      alert(
        'Não foi possível encontrar as possíveis soluções do problema, tente novamente!'
      );
    }
  }
  
  public async setSolutionProblem(payload: SetProblemSolutionAdd) {
    try {
      const response = await apiSolution.post(
        PROBLEM_ENDPOINTS.PROBLEM_SOLUTION_ADD,
        payload
      );

      return response;
    } catch (error) {
      console.log(error);
      alert(
        'Não foi possível encontrar as possíveis soluções do problema, tente novamente!'
      );
    }
  }




}
