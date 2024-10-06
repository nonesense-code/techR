import React from "react";
import ProductsApi from "./ProductsApi";

const ProductList = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const { products, isLoading, isError, error } = ProductsApi(backendURL);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products: {error.message}</div>;

  return (
    <div>
      {products.map((item, index) => (
        <div key={index}>
          <img src={item.image} alt={item.name} />
          <h1>{item.name}</h1>
          <p>Price: {item.price1}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
