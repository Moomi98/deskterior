import axios from "axios";

const BASE_URL = "http://localhost:8000/";

export const GET = async (url: string) => {
  try {
    const result = await axios.get(BASE_URL + url, {
      headers: getTokenHeader(),
    });
    return result.data;
  } catch (e) {
    throw new Error("GET ERROR");
  }
};

export const POST = async (url: string, params: object | string) => {
  try {
    const contentType =
      params instanceof Object ? "application/json" : "text/plain";
    const headers = getTokenHeader();

    headers["Content-Type"] = contentType;

    const result = await axios.post(BASE_URL + url, params, {
      headers,
      withCredentials: true,
    });

    return result.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

const getTokenHeader = () => {
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};
