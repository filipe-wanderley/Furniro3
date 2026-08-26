import { useState, type FocusEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
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
  "mt-2 w-full rounded border border-[#9F9F9F] px-4 py-3 outline-none focus:border-[#B88E2F]";

const Checkout = () => {
  const { items } = useCart();
  const [cepLoading, setCepLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutForm>({ resolver: zodResolver(checkoutSchema) });
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
  const onSubmit = async (_data: CheckoutForm) => {
    toast.success("Order placed successfully.");
  };
  return (
    <>
      <BannerCard
        title="Checkout"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Checkout" }]}
      />
      <main className="mx-auto grid max-w-[1240px] gap-12 px-6 py-12 lg:grid-cols-2 lg:py-20">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h1 className="mb-8 text-3xl font-semibold">Billing details</h1>
          <div className="grid gap-5 sm:grid-cols-2">
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
            <label>
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
            <label>
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
            <label>
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
            <label>
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
          <label className="mt-5 block">
            Additional information
            <textarea
              {...register("additionalInformation")}
              className={`${inputClass} min-h-28 resize-y`}
            />
          </label>
          <fieldset className="mt-8 space-y-4">
            <legend className="mb-3 font-semibold">Payment method</legend>
            <label className="flex items-center gap-3">
              <input
                {...register("paymentMethod")}
                type="radio"
                value="bank"
                aria-describedby={
                  errors.paymentMethod ? "checkout-payment-error" : undefined
                }
              />{" "}
              Direct Bank Transfer
            </label>
            <label className="flex items-center gap-3">
              <input {...register("paymentMethod")} type="radio" value="cash" />{" "}
              Cash On Delivery
            </label>
            {errors.paymentMethod && (
              <p
                id="checkout-payment-error"
                role="alert"
                className="text-sm text-red-700"
              >
                {errors.paymentMethod.message}
              </p>
            )}
          </fieldset>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-full rounded border border-black px-6 py-4 font-medium disabled:opacity-50"
          >
            {isSubmitting ? "PLACING ORDER..." : "Place order"}
          </button>
        </form>
        <aside className="h-fit bg-[#F9F1E7] p-8">
          <h2 className="mb-8 text-2xl font-semibold">Your order</h2>
          <div className="space-y-5">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between gap-4 text-sm">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>Rs. {money(getCartItemSubtotal(item))}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between border-t border-black/20 pt-5">
            <strong>Total</strong>
            <strong className="text-xl text-[#B88E2F]">
              Rs. {money(getCartSubtotal(items))}
            </strong>
          </div>
        </aside>
      </main>
      <BenefitsCard />
    </>
  );
};
export default Checkout;
