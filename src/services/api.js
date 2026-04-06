import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com/products';

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data.products;
  } catch (error) {
    console.error('Ошибка загрузки товаров:', error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка загрузки товара:', error);
    return null;
  }
};

// Просто возвращаем уникальные категории из товаров
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    const products = response.data.products;
    const categories = [...new Set(products.map(p => p.category))];
    return categories;
  } catch (error) {
    console.error('Ошибка загрузки категорий:', error);
    return [];
  }
};