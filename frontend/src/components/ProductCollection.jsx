import { Heart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Petal Glow Necklace Set",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=80",
    oldPrice: "₹5,799",
    price: "₹2,900",
  },
  {
    id: 2,
    name: "Crystal Harmony Necklace Set",
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=700&q=80",
    oldPrice: "₹4,299",
    price: "₹2,150",
  },
  {
    id: 3,
    name: "Crystal Luxe Necklace Set",
    image:
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=700&q=80",
    oldPrice: "₹3,299",
    price: "₹1,650",
  },
  {
    id: 4,
    name: "Crystal Whisper Necklace Set",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=80",
    oldPrice: "₹4,499",
    price: "₹2,250",
  },
];

const ProductCollection = () => {
  return (
    <section className="w-full bg-white py-10 md:py-14">
      {/* Collection Heading */}
      <div className="mb-8 flex justify-center">
        <button
          type="button"
          className="group flex items-center gap-2 text-[15px] border-b font-semibold text-[#c85f7c] transition-colors hover:text-[#b34e6b]"
        >
          <span>Shop Collection</span>

          <span className="text-[15px] font-light leading-none transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>

      {/* Products */}
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {products.map((product) => (
          <article key={product.id} className="group">
            {/* Image */}
            <div className="relative aspect-[0.78] w-full overflow-hidden rounded-[18px] bg-[#f5f5f5]">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />

              {/* Wishlist */}
              <button
                type="button"
                aria-label={`Add ${product.name} to wishlist`}
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 shadow-sm transition-all duration-200 hover:scale-105"
              >
                <Heart
                  size={15}
                  strokeWidth={1.7}
                  className="text-[#222]"
                />
              </button>
            </div>

            {/* Product Info */}
            <div className="pt-3">
              <h3 className="text-[13px] font-medium leading-[1.3] text-[#111]">
                {product.name}
              </h3>

              <div className="mt-2 flex items-center gap-2 text-[15px]">
                <span className="text-[#777] line-through">
                  {product.oldPrice}
                </span>

                <span className="font-bold text-[#171717]">
                  {product.price}
                </span>

                <span className="font-medium text-[#e73462]">
                  -50%
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProductCollection;
