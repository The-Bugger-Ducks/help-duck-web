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

const TicketList: React.FC<{ status: status | "" }> = ({ status }) => {
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const [pageable, setPageable] = useState<Pageable>();

  const [orderBy, setOrderBy] = useState<OrderByTypes>();
  const [sort, setSort] = useState<SortTicketTableTypes>();

  const [pageSize, setPageSize] = useState(20);
  const [pageNumber, setPageNumber] = useState(0);


  const [typeTicketList, setTypeTicketList] = useState<
    "client" | "support" | "status"
  >();

  const ticketRequest = new TicketRequests();
  const userInformation = SessionController.getUserInfo();

  useEffect(() => {
    if (userInformation?.role === "client") {
      getTicketListClient();
    } else if (userInformation?.role === "support") {
      getTicketPerStatus(status);
    }
  }, [status]);

  async function getTicketListClient(sorting?: string) {
    setLoading(true);
    const response = await ticketRequest.ticketListById(
      sorting
    );

    setTickets(response.content ?? []);
    setTypeTicketList("client");
    setPageable(response);
    setLoading(false);
  }

  async function getTicketListSupport(sorting?: string) {
    setLoading(true);
    const response = await ticketRequest.ticketListBySupport(sorting);
          
    const ticketsResponse: Ticket[] = response.content;

    const tickets = ticketsResponse.filter(
      (ticket) => ticket.status === "underAnalysis"
    );

    setTickets(tickets ?? []);
    setTypeTicketList("support");
    setPageable(response);
    setLoading(false);
  }

  async function getTicketPerStatus(status: status | "", sorting?: string) {
    if (status === "underAnalysis" || status === "") {
      return getTicketListSupport();
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

    if (typeTicketList == "client") {
      getTicketListClient(sort);
    } else if (typeTicketList == "support") {
      getTicketListSupport(sort);
    } else {
      getTicketPerStatus(status, sort);
    }
  }

  async function handlePageable(pageNumber: number, pageSize: number) {
    let sortAux = "";
    if (orderBy) {
      sortAux = `page=${pageNumber}&size=${pageSize}&sort=${sort},${orderBy}`;
    } else {
      sortAux = `page=${pageNumber}&size=${pageSize}&sort=${sort}`;
    }
    
    if (typeTicketList == "client") {
      getTicketListClient(sortAux);
    } else if (typeTicketList == "support") {
      getTicketListSupport(sortAux);
    } else {
      getTicketPerStatus(status, sortAux);
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
