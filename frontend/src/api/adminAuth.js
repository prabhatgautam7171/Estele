import api from "./axios";

export const adminLogin = async (email, password) => {
  const response = await api.post("/admin/login", {
    email,
    password,
  });

  return response.data;
};

export const adminRegister = async (
  name,
  email,
  password,
  passwordConfirmation
) => {
  const response = await api.post("/admin/register", {
    name,
    email,
    password,
    password_confirmation: passwordConfirmation,
  });

  return response.data;
};

export const getCurrentAdmin = async () => {
  const response = await api.get("/admin/user");

  return response.data;
};

export const adminLogout = async () => {
  const response = await api.post("/admin/logout");

  return response.data;
};
