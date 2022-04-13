import Comment from "../../interfaces/comment.interface";
import { apiTickets } from "../../services/Api.service";
import validateStatus from "../handlers/HandlerResponseStatusCodeFound";
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
    try {
      const response = await apiTickets.get(`/tickets/`, {
        validateStatus,
      });
      return response.data;
    } catch (error) {
      alert("Não foi possível carregar os chamados. Tente novamente!");
    }
  }

  public async ticketListById() {
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

  public async ticketListRequestOpened() {
    try {
      const response = await apiTickets.get(
        `/tickets/`,
        {
          validateStatus,
        }
      );
      return response.data;
    } catch (error) {
      alert("Não foi possível carregar os chamados. Tente novamente!");
    }
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
}
