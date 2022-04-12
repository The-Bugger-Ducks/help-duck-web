import { apiTickets } from "../../services/Api.service";

import validateStatus from "../handlers/HandlerResponseStatusCodeFound";

import User from "../../interfaces/user.interface"

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

  public async createTicket(ticket: { title: string, description: string, priorityLevel: string, user: User }) {
    try {
      const response = await apiTickets.post("/create", ticket)
      return response
    } catch (error) {
      alert("Não foi possível cadastrar seu chamado")
    }
  }
}
