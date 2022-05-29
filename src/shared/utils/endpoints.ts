export enum USER_ENDPOINTS {
  USER_LOGIN = "/auth/authentication",
  USER_REGISTER = "/users/create",
  USER_UPDATE = "/users/update",
  USER_DELETE = `/users/delete/`,
  USER_DETAILS = "/users/",
}

export enum TICKET_ENDPOINTS {
  TICKET_LIST = `/tickets/`,
  TICKET_LIST_BY_ID = `/tickets/user/`,
  TICKET_LIST_SUPPORT = `/tickets/support/`,
  TICKET_LIST_STATUS = `/tickets/status/`,
  TICKET_REGISTER = `/tickets/create`,
  TICKET_UPDATE = `tickets/update/`,
  TICKET_RESERVE = `helpUser/reserveTicket/`,
  TICKET_INSERT_COMMENT = `helpUser/updateComment/`,
  TICKET_CLOSE = `helpUser/closeTicket/`,
}

export enum EQUIPMENT_ENDPOINTS {
  EQUIPMENT_LIST = `/equipment/`,
  EQUIPMENT_LIST_BY_ID = `/equipment/`,
  EQUIPMENT_REGISTER = `/equipment/create`,
  EQUIPMENT_UPDATE = `/equipment/update`,
  EQUIPMENT_DELETE = `/equipment/delete/`,
}

export enum SOLUTION_ENDPOINTS {
  SOLUTION_CREATE = `/solutions/create`,
  SOLUTION_VOTE = `/solutions/vote`,
}
