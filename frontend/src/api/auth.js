import api from "./axios";

export const sendOtp = async (email) => {
  const response = await api.post("/auth/send-otp", {
    email,
  });

  return response.data;
};

export const verifyOtp = async (email, otp) => {
  try {
    console.log('otp', otp);
    const response = await api.post("/auth/verify-otp", {
      email,
      otp,
    });

    console.log(response)

    return response.data;
  } catch (error) {
    console.error("OTP verification error:", error);

    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    console.log("VALIDATION ERRORS:", error.response?.data?.errors);
  }

};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/user");

  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};
