import { GET, POST } from ".";

export const login = (code: string) => {
  return POST("login", code);
};
