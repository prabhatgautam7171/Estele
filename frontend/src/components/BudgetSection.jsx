import { ChevronRight } from "lucide-react";

const BudgetSection = () => {
  const budgetOptions = [
    {
      label: "UNDER",
      price: "₹999",
    },
    {
      label: "UNDER",
      price: "₹1,499",
    },
    {
      label: "UNDER",
      price: "₹2,799",
    },
  ];

  return (
    <section className="w-full bg-white px-4 py-10 sm:px-6 md:px-8 lg:px-12 xl:px-[10%]">
      <div className="mx-auto w-full max-w-[1660px] rounded-[32px] bg-[#fff1f5] p-6 sm:p-8 md:p-10 lg:p-12">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-10">

          {/* Heading */}
          <div className="shrink-0 text-center lg:text-left">
            <h2 className="text-[28px] font-normal leading-[1.2] tracking-[-1px] text-[#111] sm:text-[30px] md:text-[32px] lg:text-[34px]">
              Your Budget,
              <br />
              <span className="font-bold">Your Bling</span>
            </h2>
          </div>

          {/* Cards */}
          <div className="grid w-full flex-1 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">

            {/* Budget Cards */}
            {budgetOptions.map((option) => (
              <button
                key={option.price}
                className="
                  group
                  flex
                  w-full
                  flex-col
                  items-center
                  justify-center
                  rounded-[32px]
                  border-4
                  border-[#f3a0bb]
                  bg-white
                  px-4
                  py-7
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_8px_20px_rgba(243,160,187,0.2)]
                "
              >
                <span className="text-[17px] font-normal text-[#666] sm:text-[18px]">
                  {option.label}
                </span>

                <span className="mt-2 text-[30px] font-bold leading-none tracking-[-1px] text-[#171717] sm:text-[33px] md:text-[35px]">
                  {option.price}
                </span>

                <span
                  className="
                    mt-7
                    flex
                    aspect-square
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-[#f4a3bd]
                    text-white
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  <ChevronRight size={24} strokeWidth={1.5} />
                </span>
              </button>
            ))}

            {/* Premium Pearls */}
            <button
              className="
                group
                relative
                flex
                w-full
                flex-col
                items-center
                justify-center
                overflow-hidden
                rounded-[32px]
                bg-[#32103f]
                px-4
                py-7
                text-white
              "
            >
              <img
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=85"
                alt="Premium Pearls"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
              />

              <div className="absolute inset-0 bg-[#24102e]/45" />

              <div className="relative z-10 flex flex-col items-center">
                <span className="text-[17px] text-white/80 sm:text-[18px]">
                  Premium
                </span>

                <span className="mt-1 text-[27px] font-semibold leading-none sm:text-[29px]">
                  Pearls
                </span>

                <span
                  className="
                    mt-7
                    flex
                    aspect-square
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-[#f4a3bd]
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  <ChevronRight size={24} strokeWidth={1.5} />
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BudgetSection;
