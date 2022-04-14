import { AxiosResponse } from "axios";

function validateStatus(status: number) {
  return (status >= 200 && status < 300) || status === 302 || status === 404;
}

function handleResponseStatus(response: AxiosResponse) {
  if (response.status === 302) {
    return response.data;
  } else {
    if (response.status === 404) {
      return []
    } else {
      alert("Não foi possível carregar os chamados. Tente novamente!");
    }
  }
}

export { validateStatus, handleResponseStatus }
