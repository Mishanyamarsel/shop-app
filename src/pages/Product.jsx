import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/api";
import { useCart } from "../context/CartContext";

const categoryTranslations = {
  beauty: "Косметика",
  fragrances: "Парфюмерия",
  furniture: "Мебель",
  groceries: "Продукты",
  "home-decoration": "Декор",
  "kitchen-accessories": "Кухонные принадлежности",
  laptops: "Ноутбуки",
  "mens-shirts": "Мужские рубашки",
  "mens-shoes": "Мужская обувь",
  "mens-watches": "Мужские часы",
  "mobile-accessories": "Аксессуары для телефонов",
  motorcycle: "Мотоциклы",
  "skin-care": "Уход за кожей",
  smartphones: "Смартфоны",
  "sports-accessories": "Спортивные аксессуары",
  sunglasses: "Солнцезащитные очки",
  tablets: "Планшеты",
  tops: "Верхняя одежда",
  vehicle: "Транспорт",
  "womens-bags": "Женские сумки",
  "womens-dresses": "Женские платья",
  "womens-jewellery": "Украшения",
  "womens-shoes": "Женская обувь",
  "womens-watches": "Женские часы",
};

const translateCategory = (category) => {
  return categoryTranslations[category] || category;
};

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductById(id);
        if (data) {
          setProduct(data);
        } else {
          setError("Товар не найден");
        }
        setLoading(false);
      } catch (err) {
        setError("Ошибка загрузки товара");
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Загрузка...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
        <h2>{error}</h2>
        <button
          onClick={() => navigate("/")}
          style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
        >
          Вернуться в магазин
        </button>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* Кнопка "Назад" */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          cursor: "pointer",
          background: "#343f5c",
          color: "#ffffff",
          border: "none",
          borderRadius: "8px",
        }}
      >
        ← Вернуться
      </button>

      {/* Контент: картинка и информация */}
      <div
        style={{
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        {/* Левая колонка: картинка */}
        <div
          style={{
            flex: 1,
            minWidth: "250px",
            textAlign: "center",
          }}
        >
          <img
            src={product.images ? product.images[0] : product.thumbnail}
            alt={product.title}
            style={{
              width: "100%",
              maxWidth: "400px",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
        </div>

        {/* Правая колонка: информация */}
        <div
          style={{
            flex: 2,
            minWidth: "250px",
          }}
        >
          <h1 style={{ fontSize: "28px", lineHeight: "1.4", marginTop: 0 }}>
            {product.title}
          </h1>
          <p style={{ color: "#666", marginTop: "10px", lineHeight: "1.5" }}>
            {product.description}
          </p>
          <p
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#3a502c",
              marginTop: "20px",
            }}
          >
            ${product.price}
          </p>
          <p style={{ color: "#1e2749", marginTop: "10px" }}>
            Категория: {translateCategory(product.category)}
          </p>
          <button
            onClick={() => addToCart(product)}
            style={{
              marginTop: "30px",
              backgroundColor: "#ae5656",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              width: "35%",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#8e4545")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#ae5656")
            }
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
