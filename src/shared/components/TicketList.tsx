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
      if (searchedTitle.length != 0) {
        getTicketListClient(userInformation.id, searchedTitle, uriParam);
      } else {
        status === "done"
          ? getTicketListClient("", "", uriParam, "done")
          : getTicketListClient(userInformation.id, "", uriParam);
      }
    } else if (userInformation?.role === "support") {
      getTicketListSupport("", searchedTitle, uriParam, status);
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
        getTicketListClient(
          userInformation?.id ? userInformation.id : "",
          searchedTitle,
          sortAux
        );
      } else if (typeTicketList == "support") {
        getTicketListSupport(
          userInformation?.id ? userInformation.id : "",
          searchedTitle,
          sortAux
        );
      }
    } else {
      if (typeTicketList == "client") {
        getTicketListClient(
          userInformation?.id ? userInformation.id : "",
          searchedTitle,
          sortAux
        );
      } else if (typeTicketList == "support") {
        getTicketListSupport(
          userInformation?.id ? userInformation.id : "",
          searchedTitle,
          sortAux
        );
      } else {
        getTicketSupportPerStatus(
          userInformation?.id ? userInformation.id : "",
          "",
          status,
          sortAux
        );
      }
    }
  }

  function handlePageable(pageNumber: number, pageSize: number) {
    setPageNumber(pageNumber);
    setPageSize(pageSize);

    let sortAux = "";
    if (orderBy) {
      sortAux = `page=${pageNumber}&size=${pageSize}&sort=${sort},${orderBy}`;
    } else {
      sortAux = `page=${pageNumber}&size=${pageSize}&sort=${sort}`;
    }

    setUriParam(sortAux);

    if (typeTicketList == "client") {
      getTicketListClient(
        userInformation?.id ? userInformation.id : "",
        searchedTitle,
        sortAux
      );
    } else if (typeTicketList == "support") {
      getTicketListSupport(
        userInformation?.id ? userInformation.id : "",
        searchedTitle,
        sortAux
      );
    } else {
      getTicketSupportPerStatus(
        userInformation?.id ? userInformation.id : "",
        "",
        status,
        sortAux
      );
    }
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
