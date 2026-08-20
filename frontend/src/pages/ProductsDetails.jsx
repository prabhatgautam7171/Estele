import { useEffect} from "react";
import { useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Heart,
  Share2,
  Truck,
  Sparkles,
  RotateCcw,
  Gift,
  Plus,
  Minus,
  Percent,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../api/cart";

const API_URL = "http://127.0.0.1:8000";

const ProductsDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [addingToCart, setAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState("");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");

  const [openSection, setOpenSection] = useState(null);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
      return;
    }

    try {
      setAddingToCart(true);
      setCartMessage("");

      await addToCart(product.id, quantity);

      setCartMessage("Added to cart");
    } catch (error) {
      console.error("ADD TO CART ERROR:", error);
      setCartMessage(error.message);
    } finally {
      setAddingToCart(false);
    }
  };


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/api/products/${id}`);

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        console.log("PRODUCT DETAILS:", data);

        setProduct(data.product);
      } catch (err) {
        console.error(err);
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-[14px] text-[#777]">
          Loading product...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-[14px] text-red-500">
          {error || "Product not found"}
        </p>
      </div>
    );
  }

  /*
   * Supports either:
   * product.images = [...]
   *
   * or just:
   * product.image
   */
  const images =
    product.images?.length > 0
      ? product.images
      : [product.image];

  const getImageUrl = (image) => {
    if (!image) return "";

    return image.startsWith("http")
      ? image
      : `${API_URL}${image}`;
  };

  const currentImage = getImageUrl(images[selectedImage]);

  const discount = product.discount || 25;

  const mrp =
    product.mrp ||
    Math.round(Number(product.price) / (1 - discount / 100));

  const price = Number(product.price);

  const toggleSection = (section) => {
    setOpenSection(
      openSection === section ? null : section
    );
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white px-5 pb-20 pt-8 md:px-10 lg:px-[6%]">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr]">

        {/* ================================================= */}
        {/* LEFT - PRODUCT IMAGES */}
        {/* ================================================= */}

        <div className="flex gap-3">

          {/* Thumbnail column */}
          <div className="hidden w-[90px] shrink-0 flex-col gap-5 md:flex">

            {images.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`
                  h-[90px]
                  w-[90px]
                  overflow-hidden
                  rounded-[18px]
                  bg-[#f7f7f7]
                  transition-all
                  ${selectedImage === index
                    ? "ring-1 ring-[#222]"
                    : ""
                  }
                `}
              >
                <img
                  src={getImageUrl(image)}
                  alt={`${product.name} ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}

            {images.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`
                  h-[90px]
                  w-[90px]
                  overflow-hidden
                  rounded-[18px]
                  bg-[#f7f7f7]
                  transition-all
                  ${selectedImage === index
                    ? "ring-1 ring-[#222]"
                    : ""
                  }
                `}
              >
                <img
                  src={getImageUrl(image)}
                  alt={`${product.name} ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}

            {images.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`
                  h-[90px]
                  w-[90px]
                  overflow-hidden
                  rounded-[18px]
                  bg-[#f7f7f7]
                  transition-all
                  ${selectedImage === index
                    ? "ring-1 ring-[#222]"
                    : ""
                  }
                `}
              >
                <img
                  src={getImageUrl(image)}
                  alt={`${product.name} ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}

            {images.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`
                  h-[90px]
                  w-[90px]
                  overflow-hidden
                  rounded-[18px]
                  bg-[#f7f7f7]
                  transition-all
                  ${selectedImage === index
                    ? "ring-1 ring-[#222]"
                    : ""
                  }
                `}
              >
                <img
                  src={getImageUrl(image)}
                  alt={`${product.name} ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}

          </div>

          {/* Main image */}
          <div className="relative min-w-0 flex-1">

            <div className="relative aspect-square w-full overflow-hidden rounded-[20px] bg-[#f6e2dc]">

              <img
                src={currentImage}
                alt={product.name}
                className="h-full w-full object-cover"
              />

              {/* Fullscreen */}
              {/* <button
                type="button"
                className="
                  absolute
                  right-3
                  top-3
                  flex
                  h-[38px]
                  w-[38px]
                  items-center
                  justify-center
                  rounded-[12px]
                  bg-white
                  shadow-sm
                "
              >
                <Maximize2
                  size={18}
                  strokeWidth={1.5}
                />
              </button> */}

              {/* Previous */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === 0
                        ? images.length - 1
                        : prev - 1
                    )
                  }
                  className="
                    absolute
                    left-3
                    top-1/2
                    flex
                    h-[40px]
                    w-[40px]
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                  "
                >
                  <ChevronLeft size={20} />
                </button>
              )}

              {/* Next */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === images.length - 1
                        ? 0
                        : prev + 1
                    )
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    flex
                    h-[40px]
                    w-[40px]
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                  "
                >
                  <ChevronRight size={20} />
                </button>
              )}

            </div>

            {/* Mobile thumbnails */}
            <div className="mt-4 flex gap-3 overflow-x-auto md:hidden">
              {images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className={`
                    h-[70px]
                    w-[70px]
                    shrink-0
                    overflow-hidden
                    rounded-[12px]
                    ${selectedImage === index
                      ? "ring-1 ring-[#222]"
                      : ""
                    }
                  `}
                >
                  <img
                    src={getImageUrl(image)}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

          </div>
        </div>


        {/* ================================================= */}
        {/* RIGHT - PRODUCT INFORMATION */}
        {/* ================================================= */}

        <div className="pt-1">

          {/* Title + actions */}
          <div className="flex items-start justify-between gap-5">

            <h1 className="text-[16px] font-medium leading-6 text-[#444] md:text-[17px]">
              {product.name}
            </h1>

            <div className="flex shrink-0 items-center gap-3">

              <button
                type="button"
                className="
                  flex
                  h-[44px]
                  w-[44px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[#f8f4f5]
                "
              >
                <Heart
                  size={21}
                  strokeWidth={1.5}
                />
              </button>

              <button
                type="button"
                className="
                  flex
                  h-[44px]
                  w-[44px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[#f8f4f5]
                "
              >
                <Share2
                  size={19}
                  strokeWidth={1.5}
                />
              </button>

            </div>
          </div>


          {/* SKU */}
          <p className="mt-8 text-[14px] font-semibold text-[#555]">
            SKU:{" "}
            <span className="font-normal">
              {product.sku || `EST-${product.id}`}
            </span>
          </p>


          {/* Price */}
          <div className="mt-5 flex flex-wrap items-center gap-3">

            <span className="text-[20px] font-medium text-[#555] line-through">
              MRP ₹{mrp.toLocaleString("en-IN")}
            </span>

            <span className="text-[23px] font-bold text-[#222]">
              ₹{price.toLocaleString("en-IN")}
            </span>

            <span className="rounded-[5px] bg-black px-3 py-1 text-[12px] font-semibold text-white">
              SAVE {discount}%
            </span>

          </div>

          <p className="mt-2 text-[13px] text-[#777]">
            (MRP inc. of all taxes)
          </p>


          {/* Benefits */}
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">

            <div className="flex items-center gap-2 text-[13px] text-[#444]">
              <Sparkles
                size={20}
                className="text-[#f29aaa]"
                strokeWidth={1.5}
              />
              100% Anti-Tarnish
            </div>

            <div className="flex items-center gap-2 text-[13px] text-[#444]">
              <RotateCcw
                size={20}
                className="text-[#f29aaa]"
                strokeWidth={1.5}
              />
              7-Day Return & Exchange
            </div>

            <div className="flex items-center gap-2 text-[13px] text-[#444]">
              <Truck
                size={20}
                className="text-[#f29aaa]"
                strokeWidth={1.5}
              />
              Free Shipping Available
            </div>

          </div>


          {/* Delivery */}
          <div className="mt-9">

            <h2 className="mb-4 text-[16px] font-bold text-[#222]">
              DELIVERY OPTIONS 🚚
            </h2>

            <div className="flex gap-3">

              <input
                type="text"
                value={pincode}
                onChange={(e) =>
                  setPincode(
                    e.target.value.replace(/\D/g, "").slice(0, 6)
                  )
                }
                placeholder="Enter pincode"
                className="
                  h-[50px]
                  min-w-0
                  flex-1
                  rounded-[12px]
                  border
                  border-[#dc8fa5]
                  bg-white
                  px-4
                  text-[14px]
                  outline-none
                  placeholder:text-[#999]
                  focus:border-[#c96984]
                "
              />

              <button
                type="button"
                className="
                  h-[50px]
                  w-[92px]
                  rounded-[12px]
                  bg-[#d993a9]
                  text-[15px]
                  font-semibold
                  text-white
                "
              >
                Check
              </button>

            </div>

          </div>


          {/* Offers */}
          <div
            className="
              mt-6
              rounded-[14px]
              border
              border-dashed
              border-[#dc8fa5]
              px-5
              py-5
            "
          >

            <div className="flex items-center gap-2">

              <h2 className="text-[18px] font-bold text-[#171717]">
                Available Offers
              </h2>

              <Percent
                size={20}
                className="text-[#777]"
              />

            </div>

            <div className="mt-3 space-y-3 text-[14px] text-[#333]">

              <p className="flex gap-2">
                <Gift
                  size={17}
                  className="shrink-0 text-[#e48ba2]"
                />
                THE ESTELE FREEDOM SALE IS LIVE – FLAT 50%
                off SITEWIDE SHOP NOW
              </p>

              <p className="flex gap-2">
                <Gift
                  size={17}
                  className="shrink-0 text-[#e48ba2]"
                />
                Free Gift on orders above ₹1,499
              </p>

              <p className="flex gap-2">
                <Gift
                  size={17}
                  className="shrink-0 text-[#e48ba2]"
                />
                Additional 5% Off on Prepaid Orders
              </p>

            </div>

          </div>


          {/* Quantity + Add cart */}
          <div className="mt-7 flex gap-3">

            <div className="flex h-[50px] items-center overflow-hidden rounded-[12px] bg-[#f3f3f3]">

              <button
                type="button"
                onClick={decreaseQuantity}
                className="flex h-full w-[42px] items-center justify-center"
              >
                <Minus size={16} />
              </button>

              <span className="flex h-full w-[42px] items-center justify-center bg-white text-[15px]">
                {quantity}
              </span>

              <button
                type="button"
                onClick={increaseQuantity}
                className="flex h-full w-[42px] items-center justify-center"
              >
                <Plus size={16} />
              </button>

            </div>

            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              type="button"
              className="
                h-[50px]
                flex-1
                rounded-[12px]
                bg-[#cc6c8a]
                text-[13px]
                font-bold
                tracking-[1px]
                text-white
                transition
                hover:bg-[#bb5c79]
              "
            >
              {addingToCart ? "ADDING..." : "ADD TO CART"}
            </button>

            {cartMessage && (
              <p className="mt-3 text-center text-sm text-[#555]">
                {cartMessage}
              </p>
            )}

          </div>


          {/* ================================================= */}
          {/* ACCORDIONS */}
          {/* ================================================= */}

          <div className="mt-9 space-y-3">

            {/* Description */}
            <div className="overflow-hidden rounded-[14px] bg-[#fff0f4]">

              <button
                type="button"
                onClick={() =>
                  toggleSection("description")
                }
                className="
                  flex
                  min-h-[58px]
                  w-full
                  items-center
                  justify-between
                  px-5
                  text-left
                "
              >

                <span className="text-[12px] font-semibold tracking-[2px] text-[#333]">
                  DESCRIPTION
                </span>

                {openSection === "description" ? (
                  <Minus size={18} />
                ) : (
                  <Plus size={18} />
                )}

              </button>

              {openSection === "description" && (
                <div className="border-t border-white/80 px-5 pb-5 pt-4 text-[13px] leading-6 text-[#666]">
                  {product.description ||
                    "Designed with elegance and crafted for everyday luxury. This jewellery piece adds a sophisticated touch to every occasion."}
                </div>
              )}

            </div>


            {/* Return */}
            <div className="overflow-hidden rounded-[14px] bg-[#fff0f4]">

              <button
                type="button"
                onClick={() =>
                  toggleSection("return")
                }
                className="
                  flex
                  min-h-[58px]
                  w-full
                  items-center
                  justify-between
                  px-5
                  text-left
                "
              >

                <span className="text-[12px] font-semibold tracking-[2px] text-[#333]">
                  RETURN/EXCHANGE POLICY
                </span>

                {openSection === "return" ? (
                  <Minus size={18} />
                ) : (
                  <Plus size={18} />
                )}

              </button>

              {openSection === "return" && (
                <div className="border-t border-white/80 px-5 pb-5 pt-4 text-[13px] leading-6 text-[#666]">
                  Easy 7-day return and exchange available
                  on eligible products.
                </div>
              )}

            </div>


            {/* Manufacturing */}
            <div className="overflow-hidden rounded-[14px] bg-[#fff0f4]">

              <button
                type="button"
                onClick={() =>
                  toggleSection("manufacturing")
                }
                className="
                  flex
                  min-h-[58px]
                  w-full
                  items-center
                  justify-between
                  px-5
                  text-left
                "
              >

                <span className="text-[12px] font-semibold tracking-[2px] text-[#333]">
                  MANUFACTURING DETAILS
                </span>

                {openSection === "manufacturing" ? (
                  <Minus size={18} />
                ) : (
                  <Plus size={18} />
                )}

              </button>

              {openSection === "manufacturing" && (
                <div className="border-t border-white/80 px-5 pb-5 pt-4 text-[13px] leading-6 text-[#666]">
                  Made using premium materials with
                  attention to detail and quality finishing.
                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
