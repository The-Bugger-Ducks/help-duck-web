export interface Report {
  users: {
    total_users?: number,
    total_admins?: number,
    total_supports?: number,
    total_clients?: number
  },
  tickets: {
    total_tickets?: number,
    total_awaiting?: number,
    total_underAnalysis?: number,
    total_done?: number,
  },
  tickets_per_problem?: {
    network_access?: number,
    email_access?: number,
    benefits_use?: number,
    payment?: number,
    software_malfunction?: number,
    insuficient_doc?: number,
    damaged_equipament?: number,
    others?: number,
  },
  tickets_time_to_reserve?: string,
  tickets_time_to_done?: string
}
