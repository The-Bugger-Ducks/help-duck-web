import { apiDashboard } from "../../services/Api.service";

import { REPORT_ENDPOINTS } from "../endpoints";
import { Report } from "../../interfaces/report.interface";

export class ReportRequests {
  public async getReports() {
    try {
      const { data }: { data: Report } = await apiDashboard.get(REPORT_ENDPOINTS.REPORT);

      return data;
    } catch (error) {
      console.log(error);
      alert("Não foi buscar o relatório, tente novamente!");
    }
  }
}
