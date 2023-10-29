import axios from "axios";

const BASE_URL = "http://localhost:8000/";

export const GET = async (url: string) => {
  try {
    const result = await axios.get(BASE_URL + url);
    return result.data;
  } catch (e) {
    throw new Error("GET ERROR");
  }
};

export const POST = async (url: string, params: object | string) => {
  try {
    const contentType =
      params instanceof Object ? "application/json" : "text/plain";
    const token = localStorage.getItem("token");
    const headers: Record<string, string> = {
      "Content-Type": contentType,
    };

    if (token) {
      headers.Autorization = `Bearer ${token}`;
    }

    const result = await axios.post(BASE_URL + url, params, {
      headers,
      withCredentials: true,
    });

    return result.data;
  } catch (e: any) {
    throw new Error(e);
  }
};
