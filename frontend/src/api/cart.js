const API_URL = "http://127.0.0.1:8000/api";

const getToken = () => localStorage.getItem("token");

const getHeaders = () => ({
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export const getCart = async () => {
  const response = await fetch(`${API_URL}/cart`, {
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch cart");
  }

  return data;
};

export const addToCart = async (productId, quantity = 1) => {
  const response = await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      product_id: productId,
      quantity,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add product to cart");
  }

  return data;
};

export const updateCartItem = async (productId, quantity) => {
  const response = await fetch(`${API_URL}/cart/${productId}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({
      quantity,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update cart");
  }

  return data;
};

export const removeFromCart = async (productId) => {
  const response = await fetch(`${API_URL}/cart/${productId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to remove product");
  }

  return data;
};

export const clearCart = async () => {
  const response = await fetch(`${API_URL}/cart`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to clear cart");
  }

  return data;
};
