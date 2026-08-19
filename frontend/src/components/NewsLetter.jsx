import { ArrowRight } from "lucide-react";

// Replace this path with your actual newsletter banner asset
import newsletterBanner from "../assets/logo.webp";

const Newsletter = () => {
  return (
    <section className="w-full">
      <div
        className="relative min-h-[240px] w-full overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${newsletterBanner})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative mx-auto flex min-h-[240px] max-w-[1500px] items-center justify-between gap-10 px-6 py-12 sm:px-10 lg:px-16">
          {/* Left Content */}
          <div className="max-w-[520px] text-white">
            <h2 className="text-[25px] font-semibold leading-[1.25] sm:text-[30px] lg:text-[32px]">
              Get the Glow – Exclusive
              <br />
              Access Awaits
            </h2>

            <p className="mt-5 text-[12px] font-medium uppercase tracking-[2px] leading-[1.7] sm:text-[13px]">
              Subscribe to our emailer and get 5% off
              <br className="hidden sm:block" />
              your first purchase
            </p>
          </div>

          {/* Subscribe */}
          <form
            className="flex w-full max-w-[480px] overflow-hidden rounded-[12px] bg-white"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="min-w-0 flex-1 bg-white px-4 py-4 text-[14px] text-[#333] outline-none placeholder:text-[#666] sm:px-5"
            />

            <button
              type="submit"
              className="flex shrink-0 items-center gap-2 bg-[#ef91b1] px-5 py-4 text-[12px] font-semibold uppercase tracking-[1.5px] text-[#171717] transition hover:bg-[#e67fa3] sm:px-6"
            >
              Subscribe
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
