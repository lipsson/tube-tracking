import { UsersType } from "@/modules/Users/types/users.types";

const USER_TOKEN = 'user';

export const getUser = () => {
  const data = localStorage.getItem(USER_TOKEN);
  if (data) {
    return JSON.parse(data) as UsersType;
  }

  return null;
};
export const setUser = (user: unknown) => localStorage.setItem(USER_TOKEN, JSON.stringify(user));
export const removeUser = () => localStorage.removeItem(USER_TOKEN);
