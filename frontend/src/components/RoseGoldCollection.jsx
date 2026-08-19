import rose from "../assets/rose-gold-collection.webp"

const RoseGoldCollection = () => {
  return (
    <section className="w-full bg-white pt-[55px]">
      {/* Section Heading */}
      <div className="flex flex-col items-center">
        <h2 className="text-[23px] font-normal tracking-[-0.5px] text-[#666]">
          ROSE GOLD COLLECTION
        </h2>

        {/* Pink underline */}
        <div className="mt-[14px] h-[2px] w-[52px] bg-[#d56b86]" />
      </div>

      {/* Banner */}
      <div className="mt-[12px] w-full overflow-hidden">
        <img
          src={rose}
          alt="Rose Gold Collection"
          className="block h-auto w-full"
        />
      </div>
    </section>
  );
};

export default RoseGoldCollection;
