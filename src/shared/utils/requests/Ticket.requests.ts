import { apiTickets } from "../../services/Api.service";

import { handleResponseStatus, validateStatus } from "../handlers/HandlerResponseStatusCodeFound";
import SessionController from "../handlers/SessionController";

import Comment from "../../interfaces/comment.interface";
import { User } from "../../interfaces/user.interface";

import { TICKET_ENDPOINTS } from "../endpoints";

export class TicketRequests {
  public async showRequest(ticketId: string) {
    try {
      const response = await apiTickets.get(
        `${TICKET_ENDPOINTS.TICKET_LIST}${ticketId}`,
        {
          validateStatus,
        }
      );
      return response.data;
    } catch (error) {
      alert("Não foi possível encontrar o chamado. Tente novamente!");
    }
  }

  public async createTicket(ticket: {
    title: string;
    description: string;
    priorityLevel: string;
    tags: string[];
    user: User;
  }) {
    try {
      const response = await apiTickets.post(
        TICKET_ENDPOINTS.TICKET_REGISTER,
        ticket
      );
      return response;
    } catch (error) {
      console.log(error);
      alert("Não foi possível cadastrar seu chamado");
    }
  }

  public async ticketListAll() {
    const response = await apiTickets.get(TICKET_ENDPOINTS.TICKET_LIST, {
      validateStatus,
    });
    return handleResponseStatus(response);
  }

  public async ticketListById(sorting?: string) {
    const userInformation = SessionController.getUserInfo();

    let url = `${TICKET_ENDPOINTS.TICKET_LIST_BY_ID}${userInformation?.id}`

    if (sorting) {
      url = `${TICKET_ENDPOINTS.TICKET_LIST_BY_ID}${userInformation?.id}?${sorting}`
    }

    const response = await apiTickets.get(url, { validateStatus });
    return handleResponseStatus(response);
  }

  public async ticketListBySupport(sorting?: string) {
    const userInformation = SessionController.getUserInfo();

    let url = `${TICKET_ENDPOINTS.TICKET_LIST_SUPPORT}${userInformation?.id}`

    if (sorting) {
      url = `${TICKET_ENDPOINTS.TICKET_LIST_SUPPORT}${userInformation?.id}?${sorting}`
    }

    const response = await apiTickets.get(url, { validateStatus });
    return handleResponseStatus(response);
  }

  public async ticketListPerStatus(
    status: "underAnalysis" | "awaiting" | "done",
    sorting?: string
  ) {
    let url = `${TICKET_ENDPOINTS.TICKET_LIST_STATUS}${status}`

    if (sorting) {
      url = `${TICKET_ENDPOINTS.TICKET_LIST_STATUS}${status}?${sorting}`
    }

    const response = await apiTickets.get(url, { validateStatus });
    return handleResponseStatus(response);
  }

  public async reserveTicket(ticketId: string, payload: User) {
    try {
      return await apiTickets.put(
        `${TICKET_ENDPOINTS.TICKET_RESERVE}${ticketId}`,
        payload
      );
    } catch (error) {
      alert("Não foi possível reservar o chamado, tente novamente!");
    }
  }

  public async insertComment(ticketId: string, payload: Comment) {
    try {
      return await apiTickets.put(
        `${TICKET_ENDPOINTS.TICKET_INSERT_COMMENT}${ticketId}`,
        payload
      );
    } catch (error) {
      alert("Não foi possível adicionar comentário, tente novamente!");
    }
  }

  public async closeTicket(ticketId: string) {
    try {
      return await apiTickets.put(
        `${TICKET_ENDPOINTS.TICKET_CLOSE}${ticketId}`
      );
    } catch (error) {
      alert("Não foi possível fechar o chamado, tente novamente!");
    }
  }

  public async updatePriorityLevel(payload: {id: string, priorityLevel: "high" | "medium" | "low"}) {
    try {
      return await apiTickets.put(
        `${TICKET_ENDPOINTS.TICKET_UPDATE}`,
        payload
      );
    } catch (error) {
      alert("Não foi possível alterar prioridade, tente novamente!");
    }
  }
}
