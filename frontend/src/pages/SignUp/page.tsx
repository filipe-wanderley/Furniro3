import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import Logo from "../../components/Logo";
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
    <main className="grid min-h-screen bg-[#FFF3E3] lg:grid-cols-2">
      <section className="order-2 flex items-center justify-center px-6 py-12 lg:order-1">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-12 inline-flex">
            <Logo />
          </Link>
          <h1 className="mb-8 text-4xl font-semibold">Sign up</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            <label className="block">
              Email
              <input
                {...register("email")}
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "signup-email-error" : undefined
                }
                className="mt-2 w-full border-b border-black bg-transparent px-1 py-3 outline-none"
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
              Password
              <input
                {...register("password")}
                type="password"
                autoComplete="new-password"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "signup-password-error" : undefined
                }
                className="mt-2 w-full border-b border-black bg-transparent px-1 py-3 outline-none"
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
              Confirm password
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
                className="mt-2 w-full border-b border-black bg-transparent px-1 py-3 outline-none"
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
              className="w-full bg-black px-6 py-4 font-medium text-white disabled:opacity-50"
            >
              {isSubmitting ? "LOADING..." : "SIGN UP"}
            </button>
          </form>
          <p className="mt-6 text-sm">
            Already registered?{" "}
            <Link to="/login" className="font-semibold underline">
              Login
            </Link>
          </p>
        </div>
      </section>
      <div
        className="order-1 min-h-[260px] bg-cover bg-center lg:order-2 lg:min-h-screen"
        style={{ backgroundImage: "url('/Images/Hero.jpg')" }}
      />
    </main>
  );
};
export default SignUp;
