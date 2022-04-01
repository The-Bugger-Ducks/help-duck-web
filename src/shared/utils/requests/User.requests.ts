import { apiUsers } from "../../services/Api.service";
import { USER_ENDPOINTS } from "../../utils/endpoints";

export class UserRequests {
  public async loginRequest(body: object) {
    try {
      const response = await apiUsers.post(USER_ENDPOINTS.USER_LOGIN, body);
    } catch (error) {
      console.log(error);
      alert("Email ou senha incorretos.");
    }
  }
}
