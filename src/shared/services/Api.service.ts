import axios from "axios";

const apiUsers = axios.create({
  baseURL: "https://help-duck-users.herokuapp.com",
});

const apiTickets = axios.create({
  baseURL: "https://help-duck-tickets.herokuapp.com",
});

const apiAuth = axios.create({
  baseURL: "https://apple-surprise-88616.herokuapp.com",
});

const apiReports = axios.create({
  baseURL: "http://localhost:8082",
});

export { apiUsers, apiTickets, apiAuth, apiReports };
