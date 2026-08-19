import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CustomerReviews = () => {
  const reviews = [
    {
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80",
      rating: 5,
      review:
        "Absolutely love the set. The quality is beautiful and it looks even better in person. Really comfortable to wear.",
      name: "Samadi",
    },
    {
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
      rating: 5,
      review:
        "Absolutely love the set. What I liked especially was the size of the back clip which secures easily and gives a good support to the earrings.",
      name: "V J",
    },
    {
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80",
      rating: 4,
      review:
        "It's very beautiful but it's little bit loose. Quality is good, value for money. Shining is also good look like real gold.",
      name: "Jyotsna",
    },
    {
      image:
        "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=700&q=80",
      rating: 5,
      review:
        "Very nice and cute product I had purchased this to gift my sister for her birthday and she loved this a lot.",
      name: "Swapnanjali",
    },
    {
      image:
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=700&q=80",
      rating: 5,
      review:
        "Amazing Product. Very beautiful earrings, loved so much.",
      name: "Charu",
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const cardsPerPage = 5;
  const totalPages = Math.ceil(reviews.length / cardsPerPage);

  const visibleReviews = reviews.slice(
    currentPage * cardsPerPage,
    currentPage * cardsPerPage + cardsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) =>
      prev < totalPages - 1 ? prev + 1 : 0
    );
  };

  const previousPage = () => {
    setCurrentPage((prev) =>
      prev > 0 ? prev - 1 : totalPages - 1
    );
  };

  return (
    <section className="w-full bg-white py-16">
      {/* Heading */}
      <h2 className="mb-10 text-center text-[28px] font-medium tracking-[-0.5px] text-[#151515] sm:text-[32px]">
        5M+ Happy Customers
      </h2>

      {/* Reviews */}
      <div className="relative">
        {/* Left Arrow */}
        {reviews.length > cardsPerPage && (
          <button
            onClick={previousPage}
            className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-md lg:flex"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        <div className="grid grid-cols-1 gap-6 px-5 sm:grid-cols-2 lg:grid-cols-5 lg:px-0">
          {visibleReviews.map((review) => (
            <article
              key={review.name}
              className="overflow-hidden rounded-b-[14px] bg-[#fff5ef]"
            >
              {/* Image */}
              <div className="aspect-[1.80] w-full overflow-hidden rounded-t-[14px]">
                <img
                  src={review.image}
                  alt={review.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex min-h-[225px] flex-col px-4 py-4">
                {/* Stars */}
                <div className="mb-3 flex gap-[2px]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-[14px] ${
                        star <= review.rating
                          ? "text-[#ffb000]"
                          : "text-[#dedede]"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Review */}
                <p className="text-[12px] font-medium leading-[1.45] text-[#171717]">
                  {review.review}
                </p>

                {/* Name */}
                <p className="mt-auto pt-8 text-[12px] font-normal text-[#333]">
                  - {review.name}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Right Arrow */}
        {reviews.length > cardsPerPage && (
          <button
            onClick={nextPage}
            className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-md lg:flex"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {/* Slider Indicator */}
      <div className="mt-10 flex items-center justify-center gap-0">
        <div className="h-[4px] w-[38px] rounded-l-full bg-[#555]" />
        <div className="h-[4px] w-[78px] rounded-r-full bg-[#d4d4d4]" />
      </div>
    </section>
  );
};

export default CustomerReviews;
