import axios from "axios";

const BASE_URL = "http://localhost:8080/messages";

export const getMessages = () => axios.get(BASE_URL);

export const sendMessage = (content) =>
  axios.post(BASE_URL, { content });

export const deleteMessage = (id, type) =>
  axios.delete(`${BASE_URL}/${id}?type=${type}`);

export const pinMessage = (id) =>
  axios.put(`${BASE_URL}/${id}/pin`);