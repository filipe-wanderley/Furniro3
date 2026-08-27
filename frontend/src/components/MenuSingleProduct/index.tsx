import IconArrowRight from "../../../public/Icons/dashicons_arrow.svg";
import {Link} from "react-router-dom";
import clsx from "clsx";


interface MenuSingleProductProps {
  productName: string;
}

const MenuSingleProduct = ({ productName }: MenuSingleProductProps) => {
    return(
        <div className={clsx("w-full min-w-0 px-2 md:pl-24 md:pr-4")}>
            <ul className={clsx("flex min-w-0 flex-row items-center gap-2.5 md:gap-3.75")}>
                <li>
                    <Link to="/">
                        <h1 className={clsx("text-[#9F9F9F] hover:text-[#black]")}>Home</h1>
                    </Link>
                </li>
                <li>
                    <img src={IconArrowRight} alt="seta" />
                </li>
                <li>
                    <Link to="/shop">
                        <h1 className={clsx("text-[#9F9F9F] hover:text-[#black]")}>Shop</h1>
                    </Link>
                </li>
                <li>
                    <img src={IconArrowRight} alt="seta" />
                </li>
                <li className="min-w-0">
                    <h1 className={clsx("truncate font-poppins font-regular text-[16px] text-black")}>
                        {productName}
                    </h1>
                </li>
            </ul>
        </div>
    )
}
export default MenuSingleProduct;
