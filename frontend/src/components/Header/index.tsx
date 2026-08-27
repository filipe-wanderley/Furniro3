import clsx from "clsx";
import Logo from "../Logo";
import MobileMenu from "../MobileMenu";
import NavMenu from "../NavMenu";
import RightMenu from "../RigthMenu";
import { Link } from "react-router-dom";

type HeaderProps = {
  onCartClick: () => void;
  cartButtonRef: React.RefObject<HTMLButtonElement | null>;
};
const Header = ({ onCartClick, cartButtonRef }: HeaderProps) => {
  return (
      <header
        className={clsx(
          "flex justify-center items-center",
          "h-25 w-full",
          "sticky top-0 z-50",
          "bg-primary",
        )}
      >
        <div
          className={clsx(
            "flex justify-between items-center",
            "mx-auto w-full max-w-360 px-2 max-h-10.25",
            "md:px-4",
            "lg:px-12.5",
          )}
        >
          <Link to={"/"}>
            <Logo></Logo>
          </Link>
          <NavMenu className={clsx("hidden", "md:flex")}></NavMenu>
          <RightMenu
            className={clsx("hidden", "md:flex")}
            onCartClick={onCartClick}
            cartButtonRef={cartButtonRef}
          ></RightMenu>
          <MobileMenu
            className={clsx("flex", "md:hidden")}
            onCartClick={onCartClick}
            cartButtonRef={cartButtonRef}
          ></MobileMenu>
        </div>
      </header>
  );
};
export default Header;
