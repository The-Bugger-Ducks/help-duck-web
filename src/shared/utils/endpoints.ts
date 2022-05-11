export enum USER_ENDPOINTS {
  USER_REGISTER = "/users/create",
  USER_LOGIN = "/auth/authentication",
  USER_LIST = "/users/",
}

export enum TICKET_ENDPOINTS {
  TICKET_LIST = `/tickets/`,
  TICKET_LIST_BY_ID = `/tickets/user/`,
  TICKET_LIST_SUPPORT = `/tickets/support/`,
  TICKET_LIST_STATUS = `/tickets/status/`,
  TICKET_REGISTER = `/tickets/create`,
  TICKET_RESERVE = `helpUser/reserveTicket/`,
  TICKET_INSERT_COMMENT = `helpUser/updateComment/`,
  TICKET_CLOSE = `helpUser/closeTicket/`,
}

export enum EQUIPMENT_ENDPOINTS {
  EQUIPMENT_LIST = `/equipment/`,
  EQUIPMENT_REGISTER = `/equipment/create`,
}
