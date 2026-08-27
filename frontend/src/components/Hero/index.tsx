import clsx from "clsx";
import HeroButton from "../HeroButton";
import {Link} from "react-router-dom";

const Hero = () => {
  return (
    <div
      className={clsx(
        "bg-[url('/Images/Hero.jpg')] bg-cover bg-no-repeat bg-center",
        "md:h-[716.83px] md:pt-38.25 md:pr-14.5 md:justify-end md:pl-0",
        "flex justify-center items-baseline",
        "font-poppins",
        "px-4 py-20",
      )}
    >
      <div
        className={clsx(
          "max-w-160.75 w-full rounded-[10px] pr-14 pb-9.25 pt-15.5 pl-10.25",
          "flex flex-col",
          "bg-secundary",
        )}
      >
        <h2
          className={clsx(
            "text-primary-text font-semibold tracking-[3px] text-[16px] mb-1",
          )}
        >
          New Arrival
        </h2>
        <h1
          className={clsx(
            "font-bold text-over-secundary text-[22px] leading-8",
            "xxs:text-[32px] xxs:leading-12",
            "md:text-[52px] md:leading-16.25",
            "sm:text-[42px] sm:leading-14",
            "mb-4.25",
          )}
        >
          Discovery Our <br />
          New Collection
        </h1>
        <p
          className={clsx(
            "text-primary-text leading-8 font-medium",
            "text-[14px] leading-7 md:text-[18px] md:leading-8",
            "mb-11.5",
          )}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis.
        </p>
        <Link to="/shop">
          <HeroButton label="Buy Now"></HeroButton>
        </Link>
      </div>
    </div>
  );
};
export default Hero;
