import axios from "axios";

const apiUsers = axios.create({
  baseURL: "https://help-duck-register.herokuapp.com",
});

const apiEquipment = axios.create({
  baseURL: "https://help-duck-register.herokuapp.com",
});

const apiTickets = axios.create({
  baseURL: "https://help-duck-ticket.herokuapp.com",
});

apiUsers.interceptors.request.use(async (config: any) => {
  const token = sessionStorage.getItem("authentication_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token.replace(/"/g, "")}`;
  }
  return config;
});

apiEquipment.interceptors.request.use(async (config: any) => {
  const token = sessionStorage.getItem("authentication_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token.replace(/"/g, "")}`;
  }
  return config;
});

apiTickets.interceptors.request.use(async (config: any) => {
  const token = sessionStorage.getItem("authentication_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token.replace(/"/g, "")}`;
  }
  return config;
});

export { apiUsers, apiTickets, apiEquipment };
