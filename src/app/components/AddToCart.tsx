"use client"; //client component so it can listen for browser events
import React from "react";

const AddToCart = () => {
  return (
    <div>
      <button onClick={() => console.log("Clicked")}>Add to Cart</button>
    </div>
  );
};

export default AddToCart;
