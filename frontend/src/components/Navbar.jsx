import { useState } from "react";
import {
  Search,
  Heart,
  ShoppingBag,
  UserRound,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";

const Navbar = ({ onCartClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const navItems = [
    {
      label: "HASLI COLLECTION",
      badge: "NEW",
      link: "https://estele.co/collections/hasli-collection"
    },
    {
      label: "CRYSTAL BLOOMS",
      link : "https://estele.co/collections/crystal-blooms"
    },
    {
      label: "RAKHI GIFT GUIDE",
      badge: "RAKHI SPECIAL",
     link : "https://estele.co/collections/rakhi-gifting-guide"
    },
    {
      label: "NEW ARRIVALS",
      link : "https://estele.co/collections/new-arrivals"
    },
    {
      label: "SITARA COLLECTION",
      link : "https://estele.co/collections/sitara"
    },
    {
      label: "WEDDING SEASON",
      link : "https://estele.co/collections/wedding-collection"
    },
    {
      label: "NECKLACES",
      link : "https://estele.co/collections/all-jewellery"
    },
    {
      label: "CATEGORIES",
      link : "https://estele.co/collections/categories"
    },
    {
      label: "BEST SELLER",
      link : "https://estele.co/collections/best-seller"
    },
    {
      label: "COLLECTIONS",
      link : "https://estele.co/collections/collection-1"
    },
  ];

  return (
    <header
      className="
        sticky
        top-8
        z-50
        w-full
        bg-gradient-to-b
        from-[#F0E4D4]/100
        via-[#fbf7f0]/50
        to-white/10
        backdrop-blur-[3px]
      "
    >
      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block mb-10">
        {/* Top Header */}
        <div className="relative flex h-[100px] items-center px-[42px]">
          {/* Store Locator */}
          <div className="flex items-center gap-[10px] text-[12px] font-normal tracking-[-0.1px] text-[#303030]">
            <MapPin
              size={20}
              strokeWidth={1.5}
              className="text-[#4b4b4b]"
            />

            <span>Store Locator (45)</span>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <img
              src={logo}
              alt="Estele"
              className="h-[50px] w-auto object-contain"
            />
          </div>

          {/* Right Section */}
          <div className="ml-auto flex items-center ">
            {/* Search */}
            <div className="flex h-[40px] w-[300px] items-center gap-[14px] rounded-l-[16px] border-[0.5px] border-[#dcae70] bg-transparent px-[17px]">
              <Search
                size={20}
                strokeWidth={1.5}
                className="text-[#171717]"
              />

              <span className="text-[13px] font-normal tracking-[-0.15px] text-[#66615d]">
                Search for products
              </span>
            </div>

            <div className="flex gap-5 bg-[#DEC37D]  rounded-r-[16px] border border-[#dcae70] px-[17px] h-[40px]">

              {/* Wishlist */}
              <button
                type="button"
                className="relative flex items-center justify-center"
              >
                <Heart
                  size={20}
                  strokeWidth={1.5}
                  className="text-[#202020]"
                />
              </button>

              {/* Cart */}
              <button
               onClick={onCartClick}
                type="button"
                className="relative flex items-center justify-center"
              >
                <ShoppingBag
                  size={20}
                  strokeWidth={1.5}
                  className="text-[#202020]"
                />

                <span className="absolute -right-[8px] -top-[8px] flex h-[21px] w-[21px] items-center justify-center rounded-full bg-[#cf718e] text-[11px] font-medium text-white">
                  1
                </span>
              </button>

              {/* Account */}
              <button
                onClick={() => navigate("/signin")}
                type="button"
                className="flex items-center justify-center"
              >
                <UserRound
                  size={20}
                  strokeWidth={1.5}
                  className="text-[#202020]"
                />
              </button>

            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="flex h-[48px] w-full items-start justify-between px-[42px]">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative flex min-w-0 flex-1 justify-center"
            >
              {item.badge && (
                <span
                  className="
                    absolute
                    -top-[25px]
                    rounded-[5px]
                    bg-[#dda4b7]
                    px-[9px]
                    py-[4px]
                    text-[12px]
                    font-medium
                    leading-none
                    tracking-[-0.1px]
                    text-white
                  "
                >
                  {item.badge}
                </span>
              )}

              <span className="whitespace-nowrap text-[12px] font-medium leading-[20px] tracking-[-0.25px] text-[#151515]">
                <a href={item.link}> {item.label}</a>
              </span>
            </div>
          ))}
        </nav>
      </div>

      {/* ================= MOBILE / TABLET ================= */}
      <div className="block lg:hidden mb-10">
        {/* Mobile Header */}
        <div className="flex h-[72px] items-center justify-between px-4 sm:px-6">
          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center"
          >
            {mobileMenuOpen ? (
              <X
                size={23}
                strokeWidth={1.5}
                className="text-[#202020]"
              />
            ) : (
              <Menu
                size={23}
                strokeWidth={1.5}
                className="text-[#202020]"
              />
            )}
          </button>

          {/* Mobile Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <img
              src={logo}
              alt="Estele"
              className="h-[40px] w-auto object-contain sm:h-[44px]"
            />
          </div>

          {/* Mobile Actions */}
          <div className="ml-auto flex items-center gap-3 sm:gap-4">
            {/* Search */}
            <button
              type="button"
              aria-label="Search"
              className="flex items-center justify-center"
            >
              <Search
                size={20}
                strokeWidth={1.5}
                className="text-[#202020]"
              />
            </button>

            {/* Wishlist */}
            <button
              type="button"
              aria-label="Wishlist"
              className="hidden items-center justify-center sm:flex"
            >
              <Heart
                size={20}
                strokeWidth={1.5}
                className="text-[#202020]"
              />
            </button>

            {/* Cart */}
            <button
              type="button"
              aria-label="Shopping bag"
              className="relative flex items-center justify-center"
            >
              <ShoppingBag
                size={20}
                strokeWidth={1.5}
                className="text-[#202020]"
              />

              <span className="absolute -right-[7px] -top-[7px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#cf718e] text-[9px] font-medium text-white">
                1
              </span>
            </button>

            {/* Account */}
            <button
              type="button"
              aria-label="Account"
              className="hidden items-center justify-center sm:flex"
            >
              <UserRound
                size={20}
                strokeWidth={1.5}
                className="text-[#202020]"
              />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="px-4 pb-3 sm:px-6">
          <div className="flex h-[40px] w-full items-center gap-3 rounded-[12px] border border-[#dcae70] bg-white/30 px-4">
            <Search
              size={18}
              strokeWidth={1.5}
              className="shrink-0 text-[#171717]"
            />

            <span className="text-[12px] text-[#66615d]">
              Search for products
            </span>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-[#e7d8ca]/70 bg-[#fbf7f0]/95 px-4 py-4 backdrop-blur-md sm:px-6">
            {/* Store Locator */}
            <button
              type="button"
              className="mb-3 flex w-full items-center gap-3 border-b border-[#e5d9ce] pb-4 text-left"
            >
              <MapPin
                size={19}
                strokeWidth={1.5}
                className="text-[#4b4b4b]"
              />

              <span className="text-[13px] text-[#303030]">
                Store Locator (45)
              </span>
            </button>

            {/* Navigation Items */}
            <nav className="flex max-h-[65vh] flex-col overflow-y-auto">
              {navItems.map((item) => (
                <button
                  type="button"
                  key={item.label}
                  className="
                    relative
                    flex
                    w-full
                    items-center
                    justify-between
                    border-b
                    border-[#e8ddd4]
                    py-3.5
                    text-left
                  "
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-[12px] font-medium tracking-[-0.1px] text-[#151515]">
                    {item.label}
                  </span>

                  {item.badge && (
                    <span className="rounded-[4px] bg-[#dda4b7] px-2 py-1 text-[9px] font-medium text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
