import axios from "axios";

export const api = axios.create({
  baseURL: "/api/groups",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getGroups = () => {
  return api.get();
};

export const addGroup = (group) => {
  return api.post("/", group, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
