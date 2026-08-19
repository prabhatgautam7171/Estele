const SaleBar = () => {
  return (
    <div className="fixed inset-x-0 top-0 z-[100] flex h-[38px] items-center justify-center bg-[#C70100] px-4 text-white">
      <div className="flex items-center justify-center gap-2 text-[12px] font-medium tracking-[0.4px] sm:text-[12px]">
        <span>FREEDOM SALE - FLAT 50% - SITEWIDE</span>

        <a
          href="https://estele.co/collections/freedom-sale-flat-50"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline underline-offset-2 transition-opacity hover:opacity-80"
        >
          SHOP NOW
        </a>
      </div>
    </div>
  );
};

export default SaleBar;
