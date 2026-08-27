import { useState, type FocusEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BannerCard from "../../components/BannerCard";
import BenefitsCard from "../../components/BenefitsCard";
import { useCart } from "../../context/useCart";
import {
  checkoutSchema,
  type CheckoutForm,
} from "../../schemas/checkout.schema";
import { fetchAddressByCep } from "../../services/viacep.service";
import { getCartItemSubtotal, getCartSubtotal } from "../../utils/cartPrice";

const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
const inputClass =
  "mt-[22px] h-[75px] w-full rounded-[10px] border border-[#9F9F9F] px-[30px] outline-none focus:border-[#B88E2F]";

const Checkout = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [cepLoading, setCepLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutForm>({ resolver: zodResolver(checkoutSchema) });
  const paymentMethod = useWatch({ control, name: "paymentMethod" });
  const handleCepBlur = async (event: FocusEvent<HTMLInputElement>) => {
    const cep = event.target.value.replace(/\D/g, "");
    if (cep.length !== 8) return;
    setCepLoading(true);
    clearErrors("zipCode");
    try {
      const address = await fetchAddressByCep(cep);
      if (address) {
        setValue("country", "Brasil", { shouldValidate: true });
        setValue("streetAddress", address.logradouro ?? "", {
          shouldValidate: true,
        });
        setValue("townCity", address.localidade ?? "", {
          shouldValidate: true,
        });
        setValue("province", address.uf ?? "", { shouldValidate: true });
      }
    } catch {
      setError("zipCode", {
        message: "ZIP code not found. You can fill the address manually.",
      });
    } finally {
      setCepLoading(false);
    }
  };
  const onSubmit = async () => {
    toast.success("Order placed successfully.");
    clearCart();
    navigate("/");
  };
  return (
    <>
      <BannerCard
        title="Checkout"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Checkout" }]}
      />
      <main className="mx-auto grid max-w-[1242px] gap-[26px] px-6 py-[63px] font-poppins lg:h-[1829px] lg:grid-cols-2">
        <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} noValidate className="px-0 pb-[71px] pt-[35px] lg:px-[74px]">
          <h1 className="mb-[29px] text-[36px] font-semibold leading-[54px]">Billing details</h1>
          <div className="grid gap-x-[30px] gap-y-[31px] sm:grid-cols-2">
            <label>
              First Name
              <input
                {...register("firstName")}
                aria-invalid={!!errors.firstName}
                aria-describedby={
                  errors.firstName ? "checkout-first-name-error" : undefined
                }
                className={inputClass}
              />
              {errors.firstName && (
                <span
                  id="checkout-first-name-error"
                  role="alert"
                  className="mt-1 block text-sm text-red-700"
                >
                  {errors.firstName.message}
                </span>
              )}
            </label>
            <label>
              Last Name
              <input
                {...register("lastName")}
                aria-invalid={!!errors.lastName}
                aria-describedby={
                  errors.lastName ? "checkout-last-name-error" : undefined
                }
                className={inputClass}
              />
              {errors.lastName && (
                <span
                  id="checkout-last-name-error"
                  role="alert"
                  className="mt-1 block text-sm text-red-700"
                >
                  {errors.lastName.message}
                </span>
              )}
            </label>
            <label className="sm:col-span-2">
              Company Name (optional)
              <input {...register("companyName")} className={inputClass} />
            </label>
            <label className="sm:col-span-2">
              ZIP code
              <input
                {...register("zipCode", { onBlur: handleCepBlur })}
                aria-invalid={!!errors.zipCode}
                aria-describedby={
                  errors.zipCode ? "checkout-zip-error" : undefined
                }
                className={inputClass}
              />
              {cepLoading && (
                <span className="text-sm text-[#9F9F9F]">
                  Searching address...
                </span>
              )}
              {errors.zipCode && (
                <span
                  id="checkout-zip-error"
                  role="alert"
                  className="mt-1 block text-sm text-red-700"
                >
                  {errors.zipCode.message}
                </span>
              )}
            </label>
            <label className="sm:col-span-2">
              Country / Region
              <input
                {...register("country")}
                aria-invalid={!!errors.country}
                aria-describedby={
                  errors.country ? "checkout-country-error" : undefined
                }
                className={inputClass}
              />
              {errors.country && (
                <span
                  id="checkout-country-error"
                  role="alert"
                  className="mt-1 block text-sm text-red-700"
                >
                  {errors.country.message}
                </span>
              )}
            </label>
            <label className="sm:col-span-2">
              Street address
              <input
                {...register("streetAddress")}
                aria-invalid={!!errors.streetAddress}
                aria-describedby={
                  errors.streetAddress ? "checkout-street-error" : undefined
                }
                className={inputClass}
              />
              {errors.streetAddress && (
                <span
                  id="checkout-street-error"
                  role="alert"
                  className="mt-1 block text-sm text-red-700"
                >
                  {errors.streetAddress.message}
                </span>
              )}
            </label>
            <label className="sm:col-span-2">
              Town / City
              <input
                {...register("townCity")}
                aria-invalid={!!errors.townCity}
                aria-describedby={
                  errors.townCity ? "checkout-town-error" : undefined
                }
                className={inputClass}
              />
              {errors.townCity && (
                <span
                  id="checkout-town-error"
                  role="alert"
                  className="mt-1 block text-sm text-red-700"
                >
                  {errors.townCity.message}
                </span>
              )}
            </label>
            <label className="sm:col-span-2">
              Province
              <input
                {...register("province")}
                aria-invalid={!!errors.province}
                aria-describedby={
                  errors.province ? "checkout-province-error" : undefined
                }
                className={inputClass}
              />
              {errors.province && (
                <span
                  id="checkout-province-error"
                  role="alert"
                  className="mt-1 block text-sm text-red-700"
                >
                  {errors.province.message}
                </span>
              )}
            </label>
            <label className="sm:col-span-2">
              Add-on address (optional)
              <input {...register("addonAddress")} className={inputClass} />
            </label>
            <label className="sm:col-span-2">
              Email address
              <input
                {...register("email")}
                type="email"
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "checkout-email-error" : undefined
                }
                className={inputClass}
              />
              {errors.email && (
                <span
                  id="checkout-email-error"
                  role="alert"
                  className="mt-1 block text-sm text-red-700"
                >
                  {errors.email.message}
                </span>
              )}
            </label>
          </div>
          <label className="block">
            <span className="sr-only">Additional information</span>
            <textarea
              {...register("additionalInformation")}
              placeholder="Additional information"
              className={`${inputClass} !mt-[66px] h-[75px] min-h-[75px] resize-none`}
            />
          </label>
        </form>
        <aside className="h-fit px-0 pb-[86px] pt-[87px] lg:px-[38px]">
          <div className="mb-[25px] flex justify-between text-[24px] font-medium leading-9"><h2>Product</h2><h2>Subtotal</h2></div>
          <div className="space-y-5">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between gap-4 text-[16px]">
                <span className="text-[#9F9F9F]">
                  {item.name} <b className="ml-2 font-medium text-black">&times; &nbsp; {item.quantity}</b>
                </span>
                <span>Rs. {money(getCartItemSubtotal(item))}</span>
              </div>
            ))}
          </div>
          <div className="mt-[22px] flex justify-between text-[16px]">
            <span>Subtotal</span><span>Rs. {money(getCartSubtotal(items))}</span>
          </div>
          <div className="mt-[16px] flex justify-between border-b border-[#D9D9D9] pb-[33px] text-[16px]">
            <span>Total</span>
            <strong className="text-[24px] text-[#B88E2F]">
              Rs. {money(getCartSubtotal(items))}
            </strong>
          </div>
          <fieldset className="mt-[22px] space-y-[11px] text-[16px]">
            <legend className="sr-only">Payment method</legend>
            <label className="flex cursor-pointer items-center gap-[15px] text-black">
              <input {...register("paymentMethod")} type="radio" value="bank" aria-describedby={errors.paymentMethod ? "checkout-payment-error" : undefined} className="cursor-pointer accent-black" />
              Direct Bank Transfer
            </label>
            <p className={`text-justify text-[16px] font-light leading-6 transition-colors ${paymentMethod === "bank" ? "text-black" : "text-[#9F9F9F]"}`}>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
            <label className="flex cursor-pointer items-center gap-[15px] text-black">
              <input {...register("paymentMethod")} type="radio" value="cash" className="cursor-pointer accent-black" />
              Cash On Delivery
            </label>
            {errors.paymentMethod && <p id="checkout-payment-error" role="alert" className="text-sm text-red-700">{errors.paymentMethod.message}</p>}
          </fieldset>
          <p className={`mt-[22px] text-justify text-[16px] font-light leading-6 transition-colors ${paymentMethod === "cash" ? "text-black" : "text-[#9F9F9F]"}`}>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <strong>privacy policy.</strong></p>
          <button type="submit" form="checkout-form" disabled={isSubmitting} className="mx-auto mt-[39px] block h-[64px] w-[318px] max-w-full cursor-pointer rounded-[15px] border border-black bg-white text-[20px] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100">{isSubmitting ? "PLACING ORDER..." : "Place order"}</button>
        </aside>
      </main>
      <BenefitsCard />
    </>
  );
};
export default Checkout;
