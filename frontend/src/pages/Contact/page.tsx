import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import BannerCard from "../../components/BannerCard";
import BenefitsCard from "../../components/BenefitsCard";
import { contactSchema, type ContactForm } from "../../schemas/contact.schema";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });
  const onSubmit = async (_data: ContactForm) => {
    toast.success("Your message has been sent.");
  };
  return (
    <>
      <BannerCard
        title="Contact"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <main className="mx-auto max-w-[1240px] px-6 py-12 lg:py-20">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-semibold">Get In Touch With Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#9F9F9F]">
            For more information about our products and services, please feel
            free to drop us an email.
          </p>
        </div>
        <div className="grid gap-14 lg:grid-cols-[minmax(240px,1fr)_minmax(320px,1.2fr)]">
          <section className="space-y-8">
            <div>
              <h2 className="font-semibold">Address</h2>
              <p className="mt-2 text-[#666]">
                400 University Drive Suite 200
                <br />
                Coral Gables, FL 33134 USA
              </p>
            </div>
            <div>
              <h2 className="font-semibold">Phone</h2>
              <p className="mt-2 text-[#666]">
                Mobile: (+84) 546-6789
                <br />
                Hotline: (+84) 456-6789
              </p>
            </div>
            <div>
              <h2 className="font-semibold">Working Time</h2>
              <p className="mt-2 text-[#666]">
                Monday-Friday: 9:00 - 22:00
                <br />
                Saturday-Sunday: 9:00 - 21:00
              </p>
            </div>
          </section>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            <label className="block">
              Your name
              <input
                {...register("name")}
                aria-invalid={!!errors.name}
                className="mt-2 w-full rounded border border-[#9F9F9F] px-4 py-3"
              />
              {errors.name && (
                <span role="alert" className="mt-1 block text-sm text-red-700">
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
                className="mt-2 w-full rounded border border-[#9F9F9F] px-4 py-3"
              />
              {errors.email && (
                <span role="alert" className="mt-1 block text-sm text-red-700">
                  {errors.email.message}
                </span>
              )}
            </label>
            <label className="block">
              Subject
              <input
                {...register("subject")}
                className="mt-2 w-full rounded border border-[#9F9F9F] px-4 py-3"
              />
            </label>
            <label className="block">
              Message
              <textarea
                {...register("message")}
                className="mt-2 min-h-32 w-full resize-y rounded border border-[#9F9F9F] px-4 py-3"
              />
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded border border-black px-10 py-4 font-medium disabled:opacity-50"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
      <BenefitsCard />
    </>
  );
};
export default Contact;
