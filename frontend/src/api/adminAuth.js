import adminApi from "./adminAxios";

export const adminLogin = async (email, password) => {
  const response = await adminApi.post("/admin/login", {
    email,
    password,
  });

  const data = response.data;

  if (data.token) {
    localStorage.setItem("estele_admin_token", data.token);
  }

  if (data.user) {
    localStorage.setItem(
      "estele_admin_user",
      JSON.stringify(data.user)
    );
  }

  return data;
};

export const adminRegister = async (
  name,
  email,
  password,
  passwordConfirmation
) => {
  const response = await adminApi.post("/admin/register", {
    name,
    email,
    password,
    password_confirmation: passwordConfirmation,
  });

  const data = response.data;

  if (data.token) {
    localStorage.setItem("estele_admin_token", data.token);
  }

  if (data.user) {
    localStorage.setItem(
      "estele_admin_user",
      JSON.stringify(data.user)
    );
  }

  return data;
};

export const getCurrentAdmin = async () => {
  const response = await adminApi.get("/admin/user");

  return response.data;
};

export const adminLogout = async () => {
  try {
    const response = await adminApi.post("/admin/logout");

    return response.data;
  } finally {
    localStorage.removeItem("estele_admin_token");
    localStorage.removeItem("estele_admin_user");
  }
};
