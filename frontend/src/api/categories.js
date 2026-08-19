import api from "./axios";

export const getCategories = async () => {
  const response = await api.get("/categories");

  return response.data;
};

export const getCategory = async (categoryId) => {
  const response = await api.get(`/categories/${categoryId}`);

  return response.data;
};

export const getCategoryProducts = async (categoryId) => {
  const response = await api.get(
    `/categories/${categoryId}/products`
  );

  return response.data;
};
