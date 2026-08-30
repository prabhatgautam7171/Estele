import api from "./axios";

export const getMyOrders = async () => {
  const response = await api.get("/orders");

  return response.data;
};

export const placeOrder = async () => {
  const response = await api.post("/orders");

  return response.data;
};
