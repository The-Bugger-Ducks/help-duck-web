import Comment from "../../interfaces/comment.interface";
import { apiTickets } from "../../services/Api.service";
import {
  handleResponseStatus,
  validateStatus,
} from "../handlers/HandlerResponseStatusCodeFound";
import SessionController from "../handlers/SessionController";

import { User } from "../../interfaces/user.interface";

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

  public async createTicket(ticket: {
    title: string;
    description: string;
    priorityLevel: string;
    user: User;
  }) {
    try {
      const response = await apiTickets.post("/tickets/create", ticket);
      return response;
    } catch (error) {
      console.log(error);
      alert("Não foi possível cadastrar seu chamado");
    }
  }

  public async ticketListAll() {
    const response = await apiTickets.get(`/tickets/`, {
      validateStatus,
    });
    return handleResponseStatus(response);
  }

  public async ticketListById(sorting?: string) {
    const userInformation = SessionController.getUserInfo();

    let url = `/tickets/user/${userInformation?.id}`

    if (sorting) {
      url = `/tickets/user/${userInformation?.id}?${sorting}`
    }

    const response = await apiTickets.get(url, { validateStatus });
    return handleResponseStatus(response);
  }

  public async ticketListBySupport(sorting?: string) {
    const userInformation = SessionController.getUserInfo();

    let url = `/tickets/support/${userInformation?.id}`

    if (sorting) {
      url = `/tickets/support/${userInformation?.id}?${sorting}`
    }

    const response = await apiTickets.get(url, { validateStatus });
    return handleResponseStatus(response);
  }

  public async ticketListPerStatus(
    status: "underAnalysis" | "awaiting" | "done",
    sorting?: string
  ) {
    let url = `/tickets/status/${status}`

    if (sorting) {
      url = `/tickets/status/${status}?${sorting}`
    }

    const response = await apiTickets.get(url, { validateStatus });
    return handleResponseStatus(response);
  }

  public async reserveTicket(ticketId: string, payload: User) {
    try {
      return await apiTickets.put(
        `helpUser/reserveTicket/${ticketId}`,
        payload
      );
    } catch (error) {
      alert("Não foi possível reservar o chamado, tente novamente!");
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

  public async closeTicket(ticketId: string) {
    try {
      return await apiTickets.put(`helpUser/closeTicket/${ticketId}`);
    } catch (error) {
      alert("Não foi possível fechar o chamado, tente novamente!");
    }
  }
}
