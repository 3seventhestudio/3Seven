import api from "../api/api";

export const getProducts = async (params = {}) => {
  const response = await api.get("products/", {
    params,
  });

  return response.data;
};

export const getProduct = async (slug) => {
  const response = await api.get(`products/${slug}/`);

  return response.data.data;
};

export const getCategories = async () => {
  const response = await api.get("categories/");

  return response.data;
};