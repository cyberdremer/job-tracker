import backendUrl from "./backendurl";

const formToUrlParams = (form) => {
  const formData = new FormData();
  Object.entries(form).forEach(([key, value]) => {
    formData.append(key, value);
  });
  const urlQuery = new URLSearchParams(formData).toString();
  return urlQuery;
};
const getRequest = async (endpoint) => {
  const response = await fetch(`${backendUrl + endpoint}`, {
    method: "get",
    mode: "cors",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message || response.statusText);
  }
  return data;
};
const postRequest = async (endpoint, form) => {
  const query = formToUrlParams(form);
  const response = await fetch(`${backendUrl + endpoint}`, {
    method: "post",
    mode: "cors",
    credentials: "include",
    body: query,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message || response.statusText);
  }
  return data;
};

const protectedPutRequest = async (endpoint, body) => {
  const response = await fetch(`${backendUrl + endpoint} `, {
    method: "put",
    mode: "cors",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message || response.statusText);
  }
  return data;
};

const protectedPostRequest = async (endpoint, body) => {
  const bodyFormatted = formToUrlParams(body);
  const response = await fetch(`${backendUrl + endpoint}`, {
    method: "post",
    credentials: "include",
    mode: "cors",
    body: bodyFormatted,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message || response.statusText);
  }

  return data;
};

const protectedDeleteRequest = async (endpoint, body) => {
  const response = await fetch(`${backendUrl + endpoint}`, {
    method: "delete",
    mode: "cors",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message || response.statusText);
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
    throw new Error(data.error.message || response.statusText);
  }
  return data;
};

export {
  postRequest,
  getRequest,
  protectedGetRequest,
  protectedDeleteRequest,
  protectedPostRequest,
  protectedPutRequest
};
