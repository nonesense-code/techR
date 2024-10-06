import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = async (backendURL) => {
  const response = await axios.get(backendURL);
  if (!Array.isArray(response.data)) {
    throw new Error("Data format is not an array");
  }
  return response.data;
};

const ProductsApi = (backendURL) => {
  const queryKey = ["product", backendURL];

  const {
    data: product = [],
    isLoading: loading,
    isError,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => fetchProducts(backendURL),
    staleTime: 1000 * 60 * 5,
  });

  if (isError) {
    console.error("Error fetching products:", error.message);
  } else {
    product.forEach((item, index) => {
      console.log(item);
    });
  }

  return { product, loading, error };
};

export default ProductsApi;
