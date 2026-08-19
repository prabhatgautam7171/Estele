const ShopByCollection = () => {
  const collections = [
    {
      title: "COLOUR POP",
      subtitle: "COLLECTION",
      discount: "UPTO 30% OFF",
      image:
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85",
    },
    {
      title: "MOR BAGH",
      subtitle: "COLLECTION",
      discount: "UPTO 30% OFF",
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85",
    },
    {
      title: "ROSE",
      subtitle: "COLLECTION",
      discount: "UPTO 30% OFF",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85",
    },
    {
      title: "CRYSTAL BLOOM",
      subtitle: "COLLECTION",
      discount: "UPTO 40% OFF",
      image:
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85",
    },
  ];

  return (
    <section className="w-full bg-[#fff5f7] px-6 py-10 md:px-12 lg:px-[11.8%] lg:py-12">
      {/* Heading */}
      <div className="mb-7 flex flex-col items-center">
        <h2
          className="
            text-[23px] font-normal tracking-[-0.5px] text-[#666]
          "
        >
          SHOP BY COLLECTION
        </h2>

        <div className="mt-4 h-[3px] w-[56px] bg-[#cf718e]" />
      </div>

      {/* Collection Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[13px]">
        {collections.map((collection) => (
          <div
            key={collection.title}
            className="
              group
              relative
              aspect-[0.72]
              overflow-hidden
              rounded-[28px]
              bg-[#eadfd3]
            "
          >
            {/* Image */}
            <img
              src={collection.image}
              alt={collection.title}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-[1.03]
              "
            />

            {/* Soft Overlay */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-b
                from-[#fffaf4]/65
                via-transparent
                to-[#b98c5e]/10
              "
            />

            {/* Content */}
            <div className="absolute inset-x-0 top-[31px] flex flex-col items-center text-center">
              <h3
                className="
                  font-serif
                  text-[27px]
                  font-normal
                  tracking-[-1px]
                  text-[#744214]
                  md:text-[25px]
                  lg:text-[26px]
                "
              >
                {collection.title}
              </h3>

              <span
                className="
                  mt-[-2px]
                  text-[15px]
                  font-normal
                  tracking-[-0.3px]
                  text-[#744214]
                "
              >
                {collection.subtitle}
              </span>

              {/* Discount */}
              <span
                className="
                  mt-[10px]
                  rounded-[6px]
                  border
                  border-[#9d774d]
                  bg-[#fffaf3]/35
                  px-[10px]
                  py-[3px]
                  text-[13px]
                  font-medium
                  tracking-[-0.2px]
                  text-[#744214]
                "
              >
                {collection.discount}
              </span>
            </div>

            {/* Shop Now */}
            <button
              className="
                absolute
                bottom-[28px]
                left-1/2
                -translate-x-1/2
                rounded-[7px]
                bg-[#b99b76]/90
                px-[12px]
                py-[7px]
                font-serif
                text-[17px]
                font-normal
                leading-none
                text-white
                transition-all
                duration-300
                hover:bg-[#a88860]
                hover:px-[17px]
              "
            >
              SHOP NOW
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByCollection;
