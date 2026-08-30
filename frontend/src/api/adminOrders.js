import adminApi from "./adminAxios";

export const getAdminOrders = async () => {
  const response = await adminApi.get("/admin/orders");
  return response.data;
};

export const getAdminOrder = async (orderId) => {
  const response = await adminApi.get(`/admin/orders/${orderId}`);
  return response.data;
};

export const updateAdminOrderStatus = async (orderId, status) => {
  const response = await adminApi.patch(
    `/admin/orders/${orderId}/status`,
    { status }
  );

  return response.data;
};
