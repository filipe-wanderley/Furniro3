import clsx from "clsx";
import type { RefObject } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { User } from "lucide-react";

type RightMenuProps = {
  className?: string;
  onCartClick?: () => void;
  cartButtonRef?: RefObject<HTMLButtonElement | null>;
};
const RightMenu = ({
  className,
  onCartClick,
  cartButtonRef,
}: RightMenuProps) => {
  const LinkHover: string = "hover:cursor-pointer hover:scale-110 transition";
  const { user, clearSession } = useAuth();
  const navigate = useNavigate();
  return (
    <div className={clsx("flex gap-[33.66px]", className)}>
      {user ? (
        <button
          type="button"
          aria-label="Log out"
          onClick={() => {
            clearSession();
            navigate("/");
          }}
          className={clsx(LinkHover, "text-sm")}
        >
          Logout
        </button>
      ) : (
        <Link to="/login" aria-label="Open login" className={clsx(LinkHover)}>
          <User size={22} aria-hidden="true" />
        </Link>
      )}
      <button
        type="button"
        aria-label="Open cart"
        ref={cartButtonRef}
        onClick={onCartClick}
        className={clsx(LinkHover)}
      >
        <img
          src="/Icons/shop.svg"
          alt="Ícone do carrinho"
          className="max-h-[22.05px]"
        />
      </button>
    </div>
  );
};
export default RightMenu;
