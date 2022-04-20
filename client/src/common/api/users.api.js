import axios from "axios";

export const api = axios.create({
  baseURL: "/api/users",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUsers = () => {
  return api.get();
};

export const addUsers = (user) => {
  return api.post("/", user, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
