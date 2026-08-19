import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";

import {
  FiPhone,
  FiMail,
  FiChevronUp,
} from "react-icons/fi";

const Footer = () => {
  const exploreLinks = [
    "About Estele",
    "Privacy Policy",
    "FAQ",
    "Franchise",
    "Sitemap",
    "Blogs",
  ];

  const jewelleryLinks = [
    "Rose Collection",
    "Earring",
    "Maang Tika",
    "Crystal Blooms",
  ];

  const customerLinks = [
    "Find Your Order",
    "Return Exchange Policy",
    "Shipping & Delivery",
    "Track Order",
    "Contact Us",
    "Store Locator",
  ];

  return (
    <footer className="w-full bg-white text-[#292929]">

      {/* ================= NEWSLETTER ================= */}
      {/* Keep Newsletter component separate */}

      {/* ================= FOOTER ================= */}
      <div className="mx-auto max-w-[1500px] px-6 py-14 sm:px-10 lg:px-16">

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.5fr] lg:gap-16">

          {/* ================= EXPLORE ================= */}
          <FooterColumn
            title="Explore"
            links={exploreLinks}
          >
            <div className="mt-7 ">

              <p className="mb-4 text-[14px] font-semibold uppercase tracking-[1.5px]">
                Follow Us
              </p>

              <div className="flex items-center gap-3">

                <SocialIcon>
                  <FaFacebookF size={16} />
                </SocialIcon>

                <SocialIcon>
                  <FaInstagram size={17} />
                </SocialIcon>

                <SocialIcon>
                  <FaLinkedinIn size={17} />
                </SocialIcon>

              </div>

            </div>
          </FooterColumn>

          {/* ================= KNOW YOUR JEWELLERY ================= */}
          <FooterColumn
            title="Know Your Jewellery"
            links={jewelleryLinks}
          />

          {/* ================= CUSTOMER SERVICE ================= */}
          <FooterColumn
            title="Customer Service"
            links={customerLinks}
          />

          {/* ================= CONTACT ================= */}
          <div>

            <h3 className="mb-7 text-[14px] font-semibold uppercase tracking-[1.5px]">
              Contact Us
            </h3>

            {/* Address */}
            <p className="max-w-[430px] text-[14px] font-medium leading-[1.55]">
              Estele Accessories Pvt. Ltd. 9-47, Keshav Nagar, West
              <br className="hidden xl:block" />
              Hanuman Nagar, Boduppal, Hyderabad, Telangana 500092
            </p>

            {/* Phone */}
            <div className="mt-6 flex items-center gap-3 text-[14px]">

              <FiPhone
                size={19}
                strokeWidth={1.5}
              />

              <span>
                +91 8247476318
              </span>

            </div>

            {/* Email */}
            <div className="mt-5 flex items-center gap-3 text-[14px]">

              <FiMail
                size={19}
                strokeWidth={1.5}
              />

              <span>
                info@estele.co
              </span>

            </div>

            {/* App Download */}
            <p className="mt-9 max-w-[400px] text-[14px] font-medium leading-[1.5]">
              Download Our App For Exclusive Collection, Offers
              <br />
              & Discounts
            </p>

            <div className="mt-5 flex flex-wrap gap-3">

              {/* App Store */}
              <button
                type="button"
                className="flex h-[44px] min-w-[150px] items-center gap-2 rounded-[5px] bg-black px-3 text-white transition hover:opacity-90"
              >
                <FaApple size={25} />

                <div className="text-left leading-none">
                  <span className="block text-[8px]">
                    Download on the
                  </span>

                  <span className="mt-1 block text-[15px] font-medium">
                    App Store
                  </span>
                </div>
              </button>

              {/* Google Play */}
              <button
                type="button"
                className="flex h-[44px] min-w-[150px] items-center gap-2 rounded-[5px] bg-black px-3 text-white transition hover:opacity-90"
              >
                <FaGooglePlay size={20} />

                <div className="text-left leading-none">
                  <span className="block text-[8px]">
                    GET IT ON
                  </span>

                  <span className="mt-1 block text-[15px] font-medium">
                    Google Play
                  </span>
                </div>
              </button>

            </div>

          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="mt-12 border-t border-[#e8e8e8]" />

        {/* ================= COPYRIGHT ================= */}
        <div className="flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-[12px] font-medium uppercase tracking-[0.5px] text-[#777]">
            Copyright © 2026 - Estele
          </p>

        </div>

      </div>

      {/* ================= BACK TO TOP ================= */}
      <button
        type="button"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        aria-label="Back to top"
        className="fixed bottom-5 left-5 z-40 flex h-[58px] w-[58px] items-center justify-center rounded-[4px] border border-[#e5e5e5] bg-white text-[#777] shadow-sm transition hover:bg-[#fdf5f8]"
      >
        <FiChevronUp
          size={19}
          strokeWidth={1.4}
        />
      </button>

    </footer>
  );
};


/* =====================================================
   FOOTER COLUMN
===================================================== */

const FooterColumn = ({
  title,
  links,
  children,
}) => {
  return (
    <div>

      <h3 className="mb-7 text-[14px] font-semibold uppercase tracking-[1.5px]">
        {title}
      </h3>

      <ul className="space-y-5">

        {links.map((link) => (
          <li key={link}>

            <a
              href="#"
              className="text-[14px] font-medium transition-colors hover:text-[#df86a5]"
            >
              {link}
            </a>

          </li>
        ))}

      </ul>

      {children}

    </div>
  );
};


/* =====================================================
   SOCIAL ICON
===================================================== */

const SocialIcon = ({ children }) => {
  return (
    <button
      type="button"
      className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#fce8ef] text-[#d96f94] transition-all duration-200 hover:bg-[#f7d6e2] hover:scale-105"
    >
      {children}
    </button>
  );
};

export default Footer;
