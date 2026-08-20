import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const API_URL = "http://127.0.0.1:8000";

const Products = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const url = category
          ? `${API_URL}/api/products?category=${encodeURIComponent(category)}`
          : `${API_URL}/api/products`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        console.log("PRODUCTS:", data);

        setProducts(data.products || []);
      } catch (error) {
        console.error(error);
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h1 className="mb-8 text-center text-[#DEC37D] text-3xl font-serif uppercase">
        {category ? category.replace("-", " ") : "All Products"}
      </h1>

      {loading && (
        <div className="py-20 text-center">
          Loading products...
        </div>
      )}

      {error && (
        <div className="py-20 text-center text-red-500">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
              className="cursor-pointer overflow-hidden rounded-[16px] bg-[#f8f8f8]"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={
                    product.image.startsWith("http")
                      ? product.image
                      : `${API_URL}${product.image}`
                  }
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="bg-white p-4">
                <h2 className="text-[14px] font-medium text-[#333]">
                  {product.name}
                </h2>

                <p className="mt-2 text-[14px] text-[#555]">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="py-20 text-center text-[#777]">
          No products found.
        </div>
      )}
    </div>
  );
};

export default Products;
