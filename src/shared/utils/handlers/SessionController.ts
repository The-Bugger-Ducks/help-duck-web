import {User} from "../../interfaces/user.interface";

class SessionController {
  clearRecords() {
    sessionStorage.clear();
  }

  getToken() {
    const sessionToken = sessionStorage.getItem("authentication_token");

    if (!sessionToken) return null

    const token: string = JSON.parse(sessionToken);

    return token
  }

  setToken(token: string) {
    sessionStorage.setItem("authentication_token", JSON.stringify(token));
  }


  setUserInfo(user: User) {
    sessionStorage.setItem("user_data", JSON.stringify(user));
  }

  getUserInfo() {
    const sessionUser = sessionStorage.getItem("user_data");

    if (!sessionUser) return null

    const user: User = JSON.parse(sessionUser);

    return user
  }
}

export default new SessionController();
