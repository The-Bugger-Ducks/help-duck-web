import axios from "axios";

const apiUsers = axios.create({
  baseURL: "https://help-duck-register.herokuapp.com",
});

const apiTickets = axios.create({
  baseURL: "https://help-duck-tickets.herokuapp.com",
});

const apiReports = axios.create({
  baseURL: "http://localhost:8082",
});

apiUsers.interceptors.request.use(async (config: any) => {
  const token = sessionStorage.getItem("authentication_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token.replace(/"/g, "")}`;
  }
  return config;
});

export { apiUsers, apiTickets, apiReports };
