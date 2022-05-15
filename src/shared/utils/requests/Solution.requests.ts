import { apiSolution } from "../../services/Api.service";

import { SOLUTION_ENDPOINTS } from "../endpoints";
import { CreateSolution, Solution } from "../../interfaces/solution.interface";

export class SolutionRequests {
  public async setSolutionTicket(solution: CreateSolution) {
    try {
      const { data } = await apiSolution.post(SOLUTION_ENDPOINTS.SOLUTION_CREATE, solution);

      const solutionResponse: Solution = data;
      return solutionResponse;
    } catch (error) {
      console.log(error);
      alert("Não foi possível definir a solução do chamado, tente novamente!");
    }
  }
}
