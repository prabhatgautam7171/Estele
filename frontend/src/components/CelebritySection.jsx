const CelebritySection = () => {
  const celebrities = [
    {
      name: "Celebrity 1",
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Celebrity 2",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Celebrity 3",
      image:
        "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Celebrity 4",
      image:
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=700&q=80",
    },
  ];

  return (
    <section className="w-full bg-[#fff1f5] px-6 py-16 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-12">
        {/* LEFT CONTENT */}
        <div className="flex w-full max-w-[570px] flex-col items-center text-center lg:w-[34%]">
          <h2 className="text-[24px] font-light tracking-[3px] text-[#151515] sm:text-[28px]">
            AS SEEN ON{" "}
            <span className="font-[cursive] text-[43px] italic tracking-[0px] text-[#f191b2] sm:text-[50px]">
              Celebrities
            </span>
            <span className="ml-1 text-[24px] text-[#f191b2]">✦</span>
          </h2>

          <p className="mt-5 text-[17px] font-normal tracking-[-0.2px] text-[#171717] sm:text-[19px]">
            Glamour meets grace — worn by the stars, made for you.
          </p>

          <button
            type="button"
            className="mt-11 w-full max-w-[325px] rounded-[16px] bg-[#ef91b2] px-8 py-4 text-[18px] font-semibold text-white transition-all duration-300 hover:bg-[#e77fa4] hover:shadow-lg"
          >
            Shop Collection
          </button>
        </div>

        {/* CELEBRITY IMAGES */}
        <div className="grid w-full grid-cols-2 gap-5 sm:grid-cols-4 lg:w-[66%] lg:gap-6">
          {celebrities.map((celebrity, index) => (
            <div
              key={celebrity.name}
              className={`relative overflow-hidden rounded-[24px] ${
                index === 1 || index === 3
                  ? "mt-10 sm:mt-14"
                  : "mt-0"
              }`}
            >
              <div className="aspect-[0.68] w-full">
                <img
                  src={celebrity.image}
                  alt={celebrity.name}
                  className="h-full w-full object-cover"
                />

                {/* Bottom dark gradient */}
                <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-black/70 to-transparent" />

                {/* Name */}
                <p className="absolute bottom-5 left-0 right-0 text-center font-[cursive] text-[18px] italic text-white sm:text-[20px]">
                  {celebrity.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CelebritySection;
