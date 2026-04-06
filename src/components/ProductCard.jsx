import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        margin: "16px",
        width: "250px",
        display: "inline-block",
        verticalAlign: "top",
        backgroundColor: "white",
        transition: "transform 0.3s, boxShadow 0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          style={{ width: "100%", height: "200px", objectFit: "contain" }}
        />
        <h3
          style={{
            fontSize: "16px",
            height: "48px",
            overflow: "hidden",
            marginTop: "12px",
            marginBottom: "8px",
          }}
        >
          {product.title}
        </h3>
        <p
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#2c3e50",
            margin: "8px 0",
          }}
        >
          ${product.price}
        </p>
      </Link>
      <Link to={`/product/${product.id}`}>
        <button
          style={{
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%",
            marginTop: "8px",
          }}
        >
          Подробнее
        </button>
      </Link>
    </div>
  );
}

export default ProductCard;
