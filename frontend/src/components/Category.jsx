import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../api/categories";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getCategories();

        const data = await response;

        console.log("Categories API:", data);

        if (!response || !data.success) {
          throw new Error(
            data.message || "Failed to fetch categories."
          );
        }

        setCategories(data.categories || []);
      } catch (error) {
        console.error("Category API error:", error);

        setError(
          error.message || "Unable to load categories."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const totalPages = Math.ceil(
    categories.length / itemsPerPage
  );

  const visibleCategories = categories.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  return (
    <section className="w-full bg-[#f5f5f5] px-[35px] py-[30px] mt-5">
      {/* Heading */}
      <h2 className="mb-[30px] text-center text-[23px] font-normal tracking-[-0.5px] text-[#666]">
        SHOP BY CATEGORY
      </h2>

      {/* Loading */}
      {loading && (
        <div className="flex min-h-[250px] items-center justify-center">
          <p className="text-[14px] text-[#777]">
            Loading categories...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="flex min-h-[250px] items-center justify-center">
          <p className="text-[14px] text-red-500">
            {error}
          </p>
        </div>
      )}

      {/* Categories */}
      {!loading && !error && (
        <div className="mx-auto grid max-w-[1200px] lg:grid-cols-8  gap-[15px] overflow-hidden">
          {visibleCategories.map((category) => {
            console.log("CATEGORY:", category);

            return (
              <div
                key={category.id}
                onClick={() => navigate(`/products?category=${category.id}`)}
                className="min-w-0 cursor-pointer overflow-hidden rounded-[16px]  bg-white"
              >
                <div className="aspect-square w-full overflow-hidden">
                  <img
                    src={`https://estele-s2gj.onrender.com${category.image}`}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    onLoad={() =>
                      console.log("IMAGE LOADED:", category.image)
                    }
                    onError={() =>
                      console.log("IMAGE FAILED:", category.image)
                    }
                  />
                </div>

                <div className="flex h-[55px] items-center justify-center bg-white px-2">
                  <span className="text-center font-serif text-[14px] font-normal tracking-wide text-[#555]">
                    {category.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <div className="mt-[28px] flex items-center justify-center gap-[8px]">
          {Array.from({ length: totalPages }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setPage(index)}
                aria-label={`Category page ${index + 1}`}
                className={`h-[11px] rounded-full transition-all duration-300 ${page === index
                  ? "w-[40px] bg-[#222]"
                  : "w-[11px] bg-[#999]"
                  }`}
              />
            )
          )}
        </div>
      )}
    </section>
  );
};

export default CategorySection;
