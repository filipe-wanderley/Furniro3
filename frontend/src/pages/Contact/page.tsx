import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import BannerCard from "../../components/BannerCard";
import BenefitsCard from "../../components/BenefitsCard";
import { contactSchema, type ContactForm } from "../../schemas/contact.schema";

const contactInputClass =
  "mt-[22px] h-[75px] w-full rounded-[10px] border border-[#9F9F9F] px-[30px] outline-none focus:border-[#B88E2F]";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });
  const onSubmit = async () => {
    toast.success("Your message has been sent.");
  };
  return (
    <>
      <BannerCard
        title="Contact"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <main className="mx-auto max-w-[1058px] px-6 pb-[63px] pt-[98px] font-poppins lg:h-[1144px]">
        <div className="mb-[84px] text-center">
          <h1 className="text-[30px] font-semibold leading-[42px] sm:text-[36px] sm:leading-[54px]">Get In Touch With Us</h1>
          <p className="mx-auto mt-[7px] max-w-[644px] text-[16px] leading-6 text-[#9F9F9F]">
            For More Information About Our Product &amp; Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
          </p>
        </div>
        <div className="grid gap-14 lg:grid-cols-[393px_1fr] lg:gap-[30px]">
          <section className="space-y-[43px] px-4 pt-[44px] lg:px-[46px]">
            <div className="flex items-start gap-[30px]">
              <span className="flex h-[30px] w-[30px] shrink-0 justify-center"><img src="/Icons/contact-location.svg" alt="" className="h-[28px] w-[22px]" /></span>
              <div className="pt-[12px]"><h2 className="text-[24px] font-medium leading-9">Address</h2>
              <p className="max-w-[212px] text-[16px] leading-6">
                236 5th SE Avenue, New York NY10000, United States
              </p>
              </div>
            </div>
            <div className="flex items-start gap-[30px]">
              <img src="/Icons/contact-phone.svg" alt="" className="size-[30px] shrink-0" />
              <div><h2 className="text-[24px] font-medium leading-9">Phone</h2>
              <p className="max-w-[212px] text-[16px] leading-6">
                Mobile: +(84) 546-6789
                <br />
                Hotline: +(84) 456-6789
              </p>
              </div>
            </div>
            <div className="flex items-start gap-[30px]">
              <span className="flex h-[30px] w-[30px] shrink-0 justify-center"><img src="/Icons/contact-clock.svg" alt="" className="size-[23px]" /></span>
              <div><h2 className="text-[24px] font-medium leading-9">Working Time</h2>
              <p className="max-w-[212px] text-[16px] leading-6">
                Monday-Friday: 9:00 - 22:00
                <br />
                Saturday-Sunday: 9:00 - 21:00
              </p>
              </div>
            </div>
          </section>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-[36px] px-0 lg:px-[52px] lg:pt-[49px]"
          >
            <label className="block">
              Your name
              <input
                {...register("name")}
                aria-invalid={!!errors.name}
                aria-describedby={
                  errors.name ? "contact-name-error" : undefined
                }
                placeholder="Abc"
                className={contactInputClass}
              />
              {errors.name && (
                <span
                  id="contact-name-error"
                  role="alert"
                  className="mt-1 block text-sm text-red-700"
                >
                  {errors.name.message}
                </span>
              )}
            </label>
            <label className="block">
              Email address
              <input
                {...register("email")}
                type="email"
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "contact-email-error" : undefined
                }
                placeholder="Abc@def.com"
                className={contactInputClass}
              />
              {errors.email && (
                <span
                  id="contact-email-error"
                  role="alert"
                  className="mt-1 block text-sm text-red-700"
                >
                  {errors.email.message}
                </span>
              )}
            </label>
            <label className="block">
              Subject
              <input
                {...register("subject")}
                placeholder="This is an optional"
                className={contactInputClass}
              />
            </label>
            <label className="block">
              Message
              <textarea
                {...register("message")}
                placeholder="Hi! I’d like to ask about"
                className="mt-[22px] min-h-[120px] w-full resize-y rounded-[10px] border border-[#9F9F9F] px-[30px] py-[26px] outline-none focus:border-[#B88E2F]"
              />
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="!mt-[49px] h-[55px] w-full rounded-[5px] bg-[#B88E2F] text-white disabled:opacity-50 sm:w-[237px]"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
      <div className="lg:pb-[30px]"><BenefitsCard /></div>
    </>
  );
};
export default Contact;
