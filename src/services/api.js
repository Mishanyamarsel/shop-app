import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data.products; // ← DummyJSON возвращает { products: [...] }
  } catch (error) {
    console.error('Ошибка загрузки товаров:', error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка загрузки товара:', error);
    return null;
  }
};