import { useEffect, useRef, type RefObject } from "react";
import { Link } from "react-router-dom";
import { CircleX, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/useCart";
import { getCartSubtotal, getCartItemUnitPrice } from "../../utils/cartPrice";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  cartButtonRef: RefObject<HTMLButtonElement | null>;
};

const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const CartDrawer = ({ isOpen, onClose, cartButtonRef }: CartDrawerProps) => {
  const { items, removeItem } = useCart();
  const drawerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);
  useEffect(() => {
    if (isOpen) drawerRef.current?.focus();
    else cartButtonRef.current?.focus();
  }, [cartButtonRef, isOpen]);
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-[60] flex justify-end bg-black/40"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside
        className="flex h-full max-h-screen w-[min(417px,100vw)] flex-col bg-white px-[30px] pb-[28px] pt-[26px] shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        ref={drawerRef}
        tabIndex={-1}
      >
        <header className="flex items-center justify-between border-b border-[#D9D9D9] pb-[26px]">
          <h2 id="cart-drawer-title" className="text-[24px] font-semibold leading-9">
            Shopping Cart
          </h2>
          <button
            type="button"
            aria-label="Close cart"
            onClick={onClose}
            className="p-2"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
          </button>
        </header>
        <div className="min-h-0 flex-1 space-y-[20px] overflow-y-auto py-[40px]">
          {items.length === 0 ? (
            <p className="py-10 text-center text-[#9F9F9F]">
              Your cart is empty.
            </p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center gap-[32px]">
                <img
                  src={
                    item.image.startsWith("http")
                      ? item.image
                      : `${import.meta.env.VITE_API_URL ?? "http://localhost:3000"}${item.image}`
                  }
                  alt={item.name}
                  className="h-[105px] w-[108px] shrink-0 rounded-[10px] bg-[#F9F1E7] object-contain"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[16px] font-normal">{item.name}</p>
                  <p className="mt-[11px] whitespace-nowrap text-[12px]">
                    {item.quantity} <span className="mx-[12px]">×</span> <span className="text-[#B88E2F]">Rs. {money(getCartItemUnitPrice(item))}</span>
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => removeItem(item.id)}
                  className="ml-auto self-center p-1 text-[#9F9F9F]"
                >
                  <CircleX size={20} fill="#9F9F9F" color="white" />
                </button>
              </div>
            ))
          )}
        </div>
        <footer className="border-t border-[#D9D9D9] pt-[22px]">
          <div className="mb-[23px] flex justify-between text-[16px]">
            <span>Subtotal</span>
            <strong className="text-[#B88E2F]">
              Rs. {money(getCartSubtotal(items))}
            </strong>
          </div>
          <div className="flex gap-3">
            <Link
              to="/cart"
              onClick={onClose}
              className="h-[30px] flex-1 rounded-full border border-black px-4 text-center text-[12px] leading-[28px]"
            >
              Cart
            </Link>
            <Link
              to="/checkout"
              onClick={onClose}
              aria-disabled={items.length === 0}
              tabIndex={items.length === 0 ? -1 : 0}
              onKeyDown={(event) => {
                if (items.length === 0) event.preventDefault();
              }}
              className={`h-[30px] flex-1 rounded-full border border-black px-4 text-center text-[12px] leading-[28px] ${items.length === 0 ? "pointer-events-none opacity-50" : ""}`}
            >
              Checkout
            </Link>
          </div>
        </footer>
      </aside>
    </div>
  );
};

export default CartDrawer;
