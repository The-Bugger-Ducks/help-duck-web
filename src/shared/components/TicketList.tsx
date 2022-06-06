import React, { useEffect, useState } from "react";

import SessionController from "../utils/handlers/SessionController";
import { TicketRequests } from "../utils/requests/Ticket.requests";

import Ticket from "../../shared/interfaces/ticket.interface";
import { status } from "../types/status";
import { SortTicketTableTypes, OrderByTypes } from "../constants/sortTableEnum";
import { Pageable } from "../interfaces/pagable.interface";

import TicketTable from "./TicketTable";
import Pagination from "./Pagination/Pagination";

import "../styles/components/TicketList.css";

const TicketList: React.FC<{
  status: status | "";
  searchedTitle: string;
}> = ({ status, searchedTitle }) => {
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const [pageable, setPageable] = useState<Pageable>();

  const [orderBy, setOrderBy] = useState<OrderByTypes>();
  const [sort, setSort] = useState<SortTicketTableTypes>();

  const [uriParam, setUriParam] = useState("");

  const [pageSize, setPageSize] = useState(20);
  const [pageNumber, setPageNumber] = useState(0);

  const [typeTicketList, setTypeTicketList] = useState<
    "client" | "support" | "status"
  >();

  const ticketRequest = new TicketRequests();
  const userInformation = SessionController.getUserInfo();

  useEffect(() => {
    if (userInformation?.role === "client") {
      if (status == "done") {
        if (searchedTitle.length != 0) {
          getTicketListClient("", searchedTitle, uriParam, status);
        } else {
          getTicketListClient("", "", uriParam, status);
        }
      } else {
        if (searchedTitle.length != 0) {
          getTicketListClient(
            userInformation.id,
            searchedTitle,
            uriParam,
            status
          );
        } else {
          getTicketListClient(userInformation.id, "", uriParam, status);
        }
      }
    } else if (userInformation?.role === "support") {
      if (searchedTitle.length != 0) {
        if (status == "done" || status == "awaiting") {
          getTicketListSupport("", searchedTitle, uriParam, status);
        } else {
          getTicketListSupport(
            userInformation.id,
            searchedTitle,
            uriParam,
            status
          );
        }
      } else {
        console.log(status);
        if (status == "done" || status == "awaiting") {
          getTicketListSupport("", "", uriParam, status);
        } else {
          getTicketListSupport(userInformation.id, "", uriParam, status);
        }
      }
    }
  }, [status, searchedTitle]);

  async function getTicketListClient(
    id: string,
    title: string,
    sorting?: string,
    status?: string
  ) {
    setLoading(true);

    const response = await ticketRequest.searchTicketClient(
      id,
      title,
      sorting,
      status
    );

    setTickets(response.content ?? []);
    setTypeTicketList("client");
    setPageable(response);
    setLoading(false);
  }

  async function getTicketListSupport(
    id: string,
    title: string,
    sorting?: string,
    status?: string
  ) {
    setLoading(true);
    const response = await ticketRequest.searchTicketSupport(
      id,
      title,
      sorting,
      status
    );

    const ticketsResponse: Ticket[] = response.content;

    setTickets(ticketsResponse ?? []);
    setTypeTicketList("support");
    setPageable(response);
    setLoading(false);
  }

  async function getTicketSupportPerStatus(
    id: string,
    title: string,
    status: status | "",
    sorting?: string
  ) {
    if (status === "underAnalysis" || status === "") {
      return getTicketListSupport(id, title, sorting);
    }

    setLoading(true);
    const response = await ticketRequest.ticketListPerStatus(status, sorting);

    setTickets(response.content ?? []);
    setTypeTicketList("status");
    setPageable(response);
    setLoading(false);
  }

  async function getTicketClientPerStatus(
    id: string,
    title: string,
    status: status | "",
    sorting?: string
  ) {
    if (status === "underAnalysis" || status === "") {
      return getTicketListClient(id, title, sorting);
    }

    setLoading(true);
    const response = await ticketRequest.ticketListPerStatus(status, sorting);

    setTickets(response.content ?? []);
    setTypeTicketList("status");
    setPageable(response);
    setLoading(false);
  }

  function handleTableSorting(
    type: SortTicketTableTypes,
    orderBy: OrderByTypes
  ) {
    const containsOrderBy = orderBy !== OrderByTypes.none;

    let sortAux = "";
    if (containsOrderBy) {
      sortAux = `page=${pageNumber}&size=${pageSize}&sort=${type},${orderBy}`;
    } else {
      sortAux = `page=${pageNumber}&size=${pageSize}&sort=${type}`;
    }

    setSort(type);
    setOrderBy(orderBy);
    setUriParam(sortAux);

    if (searchedTitle.length != 0) {
      if (typeTicketList == "client") {
        if (status == "done") {
          getTicketListClient("", searchedTitle, sortAux, status);
        } else {
          getTicketListClient(
            userInformation?.id ? userInformation.id : "",
            searchedTitle,
            sortAux,
            status
          );
        }
      } else if (typeTicketList == "support") {
        getTicketListSupport(
          userInformation?.id ? userInformation.id : "",
          searchedTitle,
          sortAux,
          status
        );
      }
    } else {
      if (typeTicketList == "client") {
        if (status == "done") {
          getTicketListClient("", "", sortAux, status);
        } else {
          getTicketListClient(
            userInformation?.id ? userInformation.id : "",
            "",
            sortAux,
            status
          );
        }
      } else if (typeTicketList == "support") {
        getTicketListSupport(
          userInformation?.id ? userInformation.id : "",
          "",
          sortAux,
          status
        );
      }
    }
  }

  function handlePageable(pageNumber: number, pageSize: number) {
    setPageNumber(pageNumber);
    setPageSize(pageSize);

    let sortAux = "";
    if (orderBy) {
      if (sort) {
        sortAux = `page=${pageNumber}&size=${pageSize}&sort=${sort},${orderBy}`;
      } else {
        sortAux = `page=${pageNumber}&size=${pageSize}&sort=${orderBy}`;
      }
    } else {
      if (sort) {
        sortAux = `page=${pageNumber}&size=${pageSize}&sort=${sort}`;
      } else {
        sortAux = `page=${pageNumber}&size=${pageSize}`;
      }
    }

    if (searchedTitle.length != 0) {
      if (typeTicketList == "client") {
        if (status == "done") {
          sortAux += "&";
          getTicketListClient("", searchedTitle, sortAux, status);
        } else {
          getTicketListClient(
            userInformation?.id ? userInformation.id : "",
            searchedTitle,
            sortAux,
            status
          );
        }
      } else if (typeTicketList == "support") {
        getTicketListSupport("", searchedTitle, sortAux, status);
      }
    } else {
      if (typeTicketList == "client") {
        if (status == "done") {
          sortAux += "&";
          getTicketListClient("", "", sortAux, status);
        } else {
          getTicketListClient(
            userInformation?.id ? userInformation.id : "",
            "",
            sortAux,
            status
          );
        }
      } else if (typeTicketList == "support") {
        sortAux += "&";
        getTicketListSupport("", "", sortAux, status);
      }
    }
    setUriParam(sortAux);
  }

  return (
    <>
      <section className="ticket-list-container">
        <div className="grid-tickets">
          <TicketTable
            tickets={tickets}
            handleTableSorting={handleTableSorting}
            status={status}
            loading={loading}
          />
        </div>
      </section>
      <Pagination pageable={pageable} onChangePage={handlePageable} />
    </>
  );
};

export default TicketList;
