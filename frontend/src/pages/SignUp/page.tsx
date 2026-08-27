import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { signupSchema, type SignUpForm } from "../../schemas/signup.schema";
import { register as registerUser } from "../../services/auth.service";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignUpForm>({ resolver: zodResolver(signupSchema) });
  const onSubmit = async (data: SignUpForm) => {
    try {
      await registerUser(data.email, data.password);
      navigate("/login", { replace: true });
    } catch (error) {
      setError("root", {
        message:
          isAxiosError(error) && error.response?.status === 409
            ? "This email is already registered."
            : "Unable to create your account.",
      });
    }
  };
  return (
    <main className="grid min-h-screen bg-white font-poppins lg:grid-cols-2">
      <div
        className="min-h-[260px] bg-cover bg-center lg:min-h-screen"
        style={{ backgroundImage: "url('/Images/Hero.jpg')" }}
      />
      <section className="flex items-center justify-center px-6 py-10 lg:items-start lg:py-0">
        <div className="w-full max-w-[490px]">
          <Link to="/" className="mx-auto mb-8 flex h-[120px] w-[188px] items-center justify-center sm:h-[148px] sm:w-[232px] lg:mb-[50px] lg:mt-[24px]">
            <img src="/Logo/Logo.svg" alt="Furniro" className="h-full w-full object-contain" />
          </Link>
          <h1 className="mb-16 text-center text-[36px] font-semibold leading-none sm:text-[40px] lg:mb-[179px]">Sign up</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-[48px]"
          >
            <label className="block">
              <span className="sr-only">Email</span>
              <input
                {...register("email")}
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "signup-email-error" : undefined
                }
                placeholder="email"
                className="h-[43px] w-full border-0 bg-[#D9D9D9] px-[10px] text-[16px] font-semibold outline-none placeholder:text-black"
              />
              {errors.email && (
                <span
                  id="signup-email-error"
                  className="mt-1 block text-sm text-red-700"
                >
                  {errors.email.message}
                </span>
              )}
            </label>
            <label className="block">
              <span className="sr-only">Password</span>
              <input
                {...register("password")}
                type="password"
                autoComplete="new-password"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "signup-password-error" : undefined
                }
                placeholder="password"
                className="h-[43px] w-full border-0 bg-[#D9D9D9] px-[10px] text-[16px] font-semibold outline-none placeholder:text-black"
              />
              {errors.password && (
                <span
                  id="signup-password-error"
                  className="mt-1 block text-sm text-red-700"
                >
                  {errors.password.message}
                </span>
              )}
            </label>
            <label className="block">
              <span className="sr-only">Confirm password</span>
              <input
                {...register("confirmPassword")}
                type="password"
                autoComplete="new-password"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={
                  errors.confirmPassword
                    ? "signup-confirm-password-error"
                    : undefined
                }
                placeholder="confirm password"
                className="h-[43px] w-full border-0 bg-[#D9D9D9] px-[10px] text-[16px] font-semibold outline-none placeholder:text-black"
              />
              {errors.confirmPassword && (
                <span
                  id="signup-confirm-password-error"
                  className="mt-1 block text-sm text-red-700"
                >
                  {errors.confirmPassword.message}
                </span>
              )}
            </label>
            {errors.root && (
              <p role="alert" className="text-sm text-red-700">
                {errors.root.message}
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mx-auto mt-[87px] block h-[32px] w-[328px] max-w-full bg-black px-6 text-[16px] font-medium text-white disabled:opacity-50"
            >
              {isSubmitting ? "LOADING..." : "SIGN UP"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};
export default SignUp;
