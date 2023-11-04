import { atom } from "recoil";

interface UserState {
  id: string | null;
  nickname: string | null;
}

export const UserState = atom<UserState>({
  key: "user",
  default: {
    id: null,
    nickname: null,
  },
});
