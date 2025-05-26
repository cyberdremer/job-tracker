import backendUrl from "./backendurl";

const formToUrlParams = (form) => {
  return new URLSearchParams(new FormData(form)).toString();
};

const postRequest = async (endpoint, form) => {
  const query = formToUrlParams(form);
  const response = await fetch(`${backendUrl + endpoint}`, {
    method: "post",
    mode: "cors",
    body: query,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(response.error.message || response.statusText);
  }
  return data;
};

const protectedGetRequest = async (endpoint) => {
  const response = await fetch(`${backendUrl + endpoint}`, {
    method: "get",
    mode: "cors",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(response.error.message || response.statusText);
  }
  return data;
};

export default { postRequest, protectedGetRequest };
