import { useEffect, useState } from "react";
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
} from "lucide-react";

import {
  getCart,
  updateCartItem,
  removeFromCart,
} from "../api/cart";
import { useNavigate } from "react-router-dom";

const CartSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updatingItem, setUpdatingItem] = useState(null);
  const [error, setError] = useState("");

  // Fetch cart whenever sidebar opens
  useEffect(() => {
    if (!isOpen) return;

    const fetchCart = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setCart(null);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getCart();

        setCart(data.cart);

        // ---- SAVE CART DATA TO localStorage ----
      if (data.cart) {
        const cartData = {
          items: data.cart.items || [],
          totalItems: data.cart.totalItems || 0,
          subtotal: data.cart.items?.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ) || 0,
        };
        localStorage.setItem("cartData", JSON.stringify(cartData));
      }
      } catch (error) {
        console.error("CART ERROR:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [isOpen]);

  // Lock background scroll
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      setUpdatingItem(productId);

      const data = await updateCartItem(productId, quantity);

      setCart(data.cart);
    } catch (error) {
      console.error("UPDATE CART ERROR:", error);
      setError(error.message);
    } finally {
      setUpdatingItem(null);
    }
  };

  const handleRemove = async (productId) => {
    try {
      setUpdatingItem(productId);

      const data = await removeFromCart(productId);

      setCart(data.cart);
    } catch (error) {
      console.error("REMOVE CART ERROR:", error);
      setError(error.message);
    } finally {
      setUpdatingItem(null);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-[100]
          bg-black/30
          backdrop-blur-[2px]
          transition-opacity
          duration-300
          ${
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* Sidebar */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-sidebar-title"
        className={`
          fixed
          right-0
          top-0
          z-[110]
          flex
          h-screen
          w-full
          lg:max-w-[430px]
          flex-col
          bg-white
          shadow-[-10px_0_40px_rgba(0,0,0,0.12)]
          transition-transform
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* Header */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-[#ece7e2] px-6">
          <div className="flex items-center gap-3">
            <ShoppingBag
              size={20}
              strokeWidth={1.5}
              className="text-[#202020]"
            />

            <h2
              id="cart-sidebar-title"
              className="text-[17px] font-medium tracking-[-0.2px] text-[#202020]"
            >
              Your Cart
            </h2>

            {cart && cart.total_items > 0 && (
              <span className="text-[12px] text-[#888]">
                ({cart.total_items})
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              transition
              hover:bg-[#f5f3f0]
            "
          >
            <X
              size={20}
              strokeWidth={1.5}
            />
          </button>
        </div>

        {/* Content */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          {loading && (
            <div className="flex h-full items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#ddd] border-t-[#222]" />
            </div>
          )}

          {!loading && error && (
            <div className="flex h-full items-center justify-center px-6 text-center">
              <div>
                <p className="text-sm text-[#777]">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-4 text-sm underline"
                >
                  Try again
                </button>
              </div>
            </div>
          )}

          {!loading &&
            !error &&
            (!cart || cart.items.length === 0) && (
              <div className="flex h-full flex-col items-center justify-center px-8 text-center">
                <ShoppingBag
                  size={42}
                  strokeWidth={1}
                  className="mb-5 text-[#c9c2bb]"
                />

                <h3 className="text-[18px] font-medium text-[#333]">
                  Your cart is empty
                </h3>

                <p className="mt-2 text-[13px] leading-5 text-[#888]">
                  Looks like you haven't added anything
                  to your cart yet.
                </p>

                <button
                  type="button"
                  onClick={onClose}
                  className="
                    mt-6
                    rounded-full
                    bg-[#222]
                    px-7
                    py-3
                    text-[12px]
                    font-medium
                    text-white
                    transition
                    hover:bg-[#444]
                  "
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            )}

          {!loading &&
            !error &&
            cart &&
            cart.items.length > 0 && (
              <div className="px-6 py-5">
                <div className="space-y-5">
                  {cart.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b border-[#eee9e4] pb-5"
                    >
                      {/* Product Image */}
                      <div className="h-[105px] w-[90px] shrink-0 overflow-hidden rounded-[10px] bg-[#f5e8e3]">
                        <img
                          src={
                            item.image?.startsWith("http")
                              ? item.image
                              : `http://127.0.0.1:8000${item.image}`
                          }
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex justify-between gap-3">
                          <h3 className="line-clamp-2 text-[13px] leading-5 text-[#333]">
                            {item.name}
                          </h3>

                          <button
                            type="button"
                            onClick={() =>
                              handleRemove(item.product_id)
                            }
                            disabled={
                              updatingItem === item.product_id
                            }
                            aria-label={`Remove ${item.name}`}
                            className="shrink-0 text-[#999] transition hover:text-[#333]"
                          >
                            <Trash2
                              size={16}
                              strokeWidth={1.5}
                            />
                          </button>
                        </div>

                        <p className="mt-1 text-[13px] text-[#666]">
                          ₹{Number(item.price).toLocaleString("en-IN")}
                        </p>

                        {/* Quantity */}
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex h-[34px] items-center rounded-full border border-[#ddd5ce]">
                            <button
                              type="button"
                              disabled={
                                updatingItem === item.product_id ||
                                item.quantity <= 1
                              }
                              onClick={() =>
                                handleQuantityChange(
                                  item.product_id,
                                  item.quantity - 1
                                )
                              }
                              className="flex h-[32px] w-[32px] items-center justify-center text-[#555] disabled:opacity-30"
                            >
                              <Minus size={13} />
                            </button>

                            <span className="w-[28px] text-center text-[12px] text-[#333]">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              disabled={
                                updatingItem === item.product_id
                              }
                              onClick={() =>
                                handleQuantityChange(
                                  item.product_id,
                                  item.quantity + 1
                                )
                              }
                              className="flex h-[32px] w-[32px] items-center justify-center text-[#555] disabled:opacity-30"
                            >
                              <Plus size={13} />
                            </button>
                          </div>

                          <span className="text-[13px] font-medium text-[#333]">
                            ₹
                            {Number(
                              item.subtotal
                            ).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* Footer */}
        {!loading &&
          !error &&
          cart &&
          cart.items.length > 0 && (
            <div className="shrink-0 border-t border-[#e9e3dd] bg-white px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[14px] text-[#666]">
                  Subtotal
                </span>

                <span className="text-[17px] font-medium text-[#222]">
                  ₹
                  {Number(cart.subtotal).toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              <p className="mb-4 text-[11px] leading-4 text-[#999]">
                Taxes and shipping charges will be
                calculated at checkout.
              </p>

              <button
                onClick={() => navigate(`/checkout`)}
                type="button"
                className="
                  w-full
                  rounded-full
                  bg-[#222]
                  py-[15px]
                  text-[12px]
                  font-medium
                  tracking-[0.4px]
                  text-white
                  transition
                  hover:bg-[#444]
                "
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          )}
      </aside>
    </>
  );
};

export default CartSidebar;
