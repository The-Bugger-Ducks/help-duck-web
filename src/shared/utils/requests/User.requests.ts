import { apiAuth, apiUsers } from '../../services/Api.service';
import { USER_ENDPOINTS } from '../../utils/endpoints';

export class UserRequests {
  public async loginRequest(body: object) {
    try {
      const response = await apiAuth.post(USER_ENDPOINTS.USER_LOGIN, body);
      return response.data;
    } catch (error) {
      console.log(error);
      alert('Email ou senha incorretos.');
    }
  }

  public async registerRequest(body: object) {
    try {
      const response = await apiUsers.post(USER_ENDPOINTS.USER_REGISTER, body);
      return response.data;
    } catch (error) {
      console.log(error);
      alert('Não foi possível cadastrar usuário');
    }
  }

  public async updateRequest(body: object) {
    try {
      const response = await apiUsers.post(USER_ENDPOINTS.USER_UPDATE, body);
      return response.data;
    } catch (error) {
      console.log(error);
      alert('Não foi possível atualizar dados do usuário');
    }
  }
}
