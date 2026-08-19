import {
  Sparkles,
  PackageCheck,
  Truck,
} from "lucide-react";
import storeBanner from "../assets/store-banner.webp";

const StoreSection = () => {
  const features = [
    {
      icon: Sparkles,
      title: "100% Anti-Tarnish",
    },
    {
      icon: PackageCheck,
      title: "7-Day Return & Exchange",
    },
    {
      icon: Truck,
      title: "Free Shipping Available",
    },
  ];

  return (
    <section className="w-full bg-white px-5 py-14 sm:px-8 lg:px-12 xl:px-16">
      {/* Store Banner */}
      <div className="mx-auto max-w-[1200px]">
        <img
          src={storeBanner}
          alt="Touch, Try, Treasure - In Store"
          className="block h-auto w-full rounded-[32px] object-cover"
        />
      </div>

      {/* Features */}
      <div className="mx-auto mt-16 flex max-w-[1200px] flex-col items-center justify-between gap-8 lg:flex-row lg:gap-0">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="flex w-full items-center justify-center lg:w-auto"
            >
              <div className="flex items-center gap-3 px-10">
                <Icon
                  size={20}
                  strokeWidth={1.5}
                  className="text-[#f39abb]"
                />

                <span className="whitespace-nowrap text-[13px] font-normal text-[#303030] sm:text-[13px]">
                  {feature.title}
                </span>

                <button
                  type="button"
                  className="text-[12px] font-normal text-[#ef91b2] underline underline-offset-2"
                >
                  know more
                </button>
              </div>

              {/* Divider */}
              {index !== features.length - 1 && (
                <div className="ml-16 hidden h-[42px] w-px bg-[#cfcfcf] lg:block" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StoreSection;
