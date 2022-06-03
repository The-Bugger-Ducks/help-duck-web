import {User, UserLogin, UserRegister} from '../../interfaces/user.interface';
import { UserRequests } from '../requests/User.requests';

export default class HandleUserFormData {
  public handleLogin(user: UserLogin) {
    let body = {
      email: user.email,
      password: user.password,
    };

    let userRequests = new UserRequests();
    return userRequests.loginRequest(body);
  }

  public handleRegister(user: UserRegister) {
    let body = {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      department: user.department,
    };

    let userRequests = new UserRequests();
    userRequests.registerRequest(body);
  }

  public handleUpdate(user: User) {
    let body = {
      email: user.email,
      name: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };

    let userRequests = new UserRequests();
    userRequests.updateRequest(body);
  }
}
