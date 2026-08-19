import api from "./axios";

export const getProducts = async () => {
  const response = await api.get("/products");

  return response.data;
};

export const getProduct = async (productId) => {
  const response = await api.get(`/products/${productId}`);

  return response.data;
};
