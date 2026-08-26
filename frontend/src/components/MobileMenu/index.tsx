import { LuMenu } from "react-icons/lu";
import NavMenu from "../NavMenu";
import { useState } from "react";
import RightMenu from "../RigthMenu";
import clsx from "clsx";
import type { RefObject } from "react";

type MobileMenuProps = {
  className?: string;
  onCartClick?: () => void;
  cartButtonRef?: RefObject<HTMLButtonElement | null>;
};
const MobileMenu = ({
  className,
  onCartClick,
  cartButtonRef,
}: MobileMenuProps) => {
  const [ativo, setAtivo] = useState(false);
  return (
    <div className={clsx("relative", className)}>
      <button
        type="button"
        aria-label="Open mobile menu"
        onClick={() => setAtivo(!ativo)}
      >
        <LuMenu
          size={32}
          className={clsx(
            "hover:cursor-pointer hover:scale-110 transition-all",
          )}
        ></LuMenu>
      </button>
      <NavMenu
        className={clsx(
          "h-[calc(100vh-100px)] max-w-[50vw] min-w-62.5",
          "absolute top-16.25 -right-2",
          "flex-col",
          "justify-center items-center gap-5 ",
          "bg-primary",
          {
            flex: ativo,
            hidden: !ativo,
          },
        )}
      >
        <RightMenu
          className={clsx("mt-6")}
          onCartClick={onCartClick}
          cartButtonRef={cartButtonRef}
        ></RightMenu>
      </NavMenu>
    </div>
  );
};
export default MobileMenu;
