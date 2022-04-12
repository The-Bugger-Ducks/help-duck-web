import Comment from "../../interfaces/comment.interface";
import { apiTickets } from "../../services/Api.service";
import validateStatus from "../handlers/HandlerResponseStatusCodeFound";
import { TICKET_ENDPOINTS } from "../endpoints";
import SessionController from "../handlers/SessionController";

export class TicketRequests {
  public async showRequest(ticketId: string) {
    try {
      const response = await apiTickets.get(`/tickets/${ticketId}`, {
        validateStatus,
      });
      return response.data;
    } catch (error) {
      alert("Não foi possível encontrar o chamado. Tente novamente!");
    }
  }

  public async ticketListRequest() {
    const userInformation = SessionController.getUserInfo();
    try {
      const response = await apiTickets.get(
        `/tickets/user/${userInformation?.id}`,
        {
          validateStatus,
        }
      );
      return response.data;
    } catch (error) {
      alert("Não foi possível carregar os chamados. Tente novamente!");
    }
  }

  public async insertComment(ticketId: string, payload: Comment) {
    try {
      return await apiTickets.put(
        `helpUser/updateComment/${ticketId}`,
        payload
      );
    } catch (error) {
      alert("Não foi possível adicionar comentário, tente novamente!");
    }
  }
}
