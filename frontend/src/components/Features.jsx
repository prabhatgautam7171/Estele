import feature1 from "../assets/feature1.svg";
import feature2 from "../assets/feature2.svg";
import feature3 from "../assets/feature3.svg";
import feature4 from "../assets/feature4.svg";
import feature5 from "../assets/feature5.svg";
import feature6 from "../assets/feature6.svg";

const FeaturesSection = () => {
  const features = [
    {
      image: feature1,
      title: "24 GOLD-PLATED",
      subtitle: "JEWELLERY",
    },
    {
      image: feature2,
      title: "DESIGNED IN",
      subtitle: "HYDERABAD",
    },
    {
      image: feature3,
      title: "HANDCRAFTED",
      subtitle: "SKIN FRIENDLY",
    },
    {
      image: feature4,
      title: "35+ YEARS",
      subtitle: "LEGACY",
    },
    {
      image: feature5,
      title: "1 YEAR",
      subtitle: "WARRANTY",
    },
    {
      image: feature6,
      title: "LIFETIME",
      subtitle: "SERVICE",
    },
  ];

  return (
    <section className="w-full bg-[#fff7f9] px-5 py-14 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      {/* Heading */}
      <div className="mx-auto max-w-5xl text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="h-[2px] w-8 bg-[#d8799b]" />

          <h2 className="text-[24px] font-medium tracking-[5px] text-[#d8799b] sm:text-[27px]">
            ESTE<span className="tracking-[6px]">LE</span>
          </h2>

          <span className="h-[2px] w-8 bg-[#d8799b]" />
        </div>

        <div className="mt-1 flex items-center justify-center gap-1">
          <span className="text-[20px] text-[#d8799b]">✦</span>

          <p className="text-[20px] font-semibold text-[#d8799b] sm:text-[22px]">
            Sparkle That Stays With You
          </p>
        </div>

        <p className="mx-auto mt-7 max-w-[950px] text-[14px] leading-7 text-[#4d4d4d] sm:text-[16px]">
          Estele is a leading Indian fashion jewellery brand since 1989,
          offering over 100,000 unique designs crafted with elegance
          and quality. With 95% in-house manufacturing in Hyderabad and
          a 75% women workforce,
        </p>
      </div>

      {/* Features */}
      <div className="mx-auto mt-12 grid max-w-[1200px] grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-10 xl:gap-x-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex justify-center"
          >
            <img
              src={feature.image}
              alt={`${feature.title} ${feature.subtitle}`}
              className="h-auto w-full max-w-[190px] object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
