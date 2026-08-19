import { useState } from "react";

const categories = [
  {
    name: "MAANG TIKKA",
    image: "https://placehold.co/500x500/f6d8dc/777?text=Maang+Tikka",
  },
  {
    name: "MANGALSUTRA",
    image: "https://placehold.co/500x500/f4d2d8/777?text=Mangalsutra",
  },
  {
    name: "NECKLACE SET",
    image: "https://placehold.co/500x500/f7dce0/777?text=Necklace+Set",
  },
  {
    name: "PENDANT SETS",
    image: "https://placehold.co/500x500/f5d5da/777?text=Pendant+Sets",
  },
  {
    name: "EARRINGS",
    image: "https://placehold.co/500x500/f3d1d6/777?text=Earrings",
  },
  {
    name: "FINGER RINGS",
    image: "https://placehold.co/500x500/f7dfe2/777?text=Finger+Rings",
  },
  {
    name: "BRACELETS",
    image: "https://placehold.co/500x500/f5d6dc/777?text=Bracelets",
  },
  {
    name: "BANGLES",
    image: "https://placehold.co/500x500/f3d0d6/777?text=Bangles",
  },
  {
    name: "NOSE PINS",
    image: "https://placehold.co/500x500/f7dce1/777?text=Nose+Pins",
  },
  {
    name: "ANKLETS",
    image: "https://placehold.co/500x500/f4d3d9/777?text=Anklets",
  },
];

const CategorySection = () => {
  const [page, setPage] = useState(0);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(categories.length / itemsPerPage);

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

      {/* Categories */}
      <div className="mx-auto flex max-w-[1200px] gap-[15px] overflow-hidden">
        {visibleCategories.map((category) => (
          <div
            key={category.name}
            className="min-w-0 flex-1 overflow-hidden rounded-[16px] bg-white"
          >
            {/* Image */}
            <div className="aspect-square w-full overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Category name */}
            <div className="flex h-[55px] items-center justify-center bg-white px-2">
              <span className="text-center font-serif text-[14px] font-normal tracking-wide text-[#555]">
                {category.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-[28px] flex items-center justify-center gap-[8px]">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index)}
            aria-label={`Category page ${index + 1}`}
            className={`h-[11px] rounded-full transition-all duration-300 ${
              page === index
                ? "w-[40px] bg-[#222]"
                : "w-[11px] bg-[#999]"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
