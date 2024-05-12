import React from "react";
import AddToCart from "./AddToCart";
// import styles from "./css/ProductCard.module.css";

const ProductCard = () => {
  return (
    // <div className={styles.card}>
    <div className="btn">
      <AddToCart />
    </div>
  );
};

export default ProductCard;
