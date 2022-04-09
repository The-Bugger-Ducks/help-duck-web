import { apiTickets } from "../../services/Api.service";

import validateStatus from "../handlers/HandlerResponseStatusCodeFound";

export class TicketRequests {
  public async showRequest(ticketId: string) {
    try {
      const response = await apiTickets.get(`/${ticketId}`, {
        validateStatus
      });
      return response.data
    } catch (error) {
      alert("Não foi possível encontrar o chamado. Tente novamente!");
    }
  }
}
