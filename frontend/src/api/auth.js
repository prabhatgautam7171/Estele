import api from "./axios";

export const sendOtp = async (email) => {
  const response = await api.post("/auth/send-otp", {
    email,
  });

  return response.data;
};

export const verifyOtp = async (email, otp) => {
  const response = await api.post("/auth/verify-otp", {
    email,
    otp,
  });

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/user");

  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};
