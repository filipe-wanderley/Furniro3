import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { loginSchema, type LoginForm } from "../../schemas/login.schema";
import { login } from "../../services/auth.service";
import { useAuthStore } from "../../context/authStore";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setSession = useAuthStore((state) => state.setSession);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });
  const from = (location.state as { from?: string } | null)?.from ?? "/";
  const onSubmit = async (data: LoginForm) => {
    try {
      const session = await login(data.email, data.password);
      setSession(session.token, session.user);
      navigate(from, { replace: true });
    } catch (error) {
      setError("root", {
        message:
          isAxiosError(error) &&
          [400, 401].includes(error.response?.status ?? 0)
            ? "Invalid email or password."
            : "Unable to sign in. Try again.",
      });
    }
  };
  return (
    <main className="grid min-h-screen bg-white font-poppins lg:grid-cols-2">
      <div
        className="hidden min-h-screen bg-cover bg-center lg:block"
        style={{ backgroundImage: "url('/Images/Hero.jpg')" }}
      />
      <section className="flex items-center justify-center px-6 py-12 lg:items-start lg:py-0">
        <div className="w-full max-w-[490px]">
          <Link to="/" className="mx-auto mb-[35px] flex h-[148px] w-[232px] items-center justify-center lg:mt-[222px]">
            <img src="/Logo/Logo.svg" alt="Furniro" className="h-full w-full object-contain" />
          </Link>
          <h1 className="mb-[35px] text-center text-[40px] font-semibold leading-none">Login</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-[39px]"
          >
            <label className="block">
              <span className="sr-only">Email</span>
              <input
                {...register("email")}
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "login-email-error" : undefined
                }
                placeholder="email"
                className="h-[43px] w-full border-0 bg-[#D9D9D9] px-[10px] text-[16px] font-semibold outline-none placeholder:text-black"
              />
              {errors.email && (
                <span
                  id="login-email-error"
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
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "login-password-error" : undefined
                }
                placeholder="password"
                className="h-[43px] w-full border-0 bg-[#D9D9D9] px-[10px] text-[16px] font-semibold outline-none placeholder:text-black"
              />
              {errors.password && (
                <span
                  id="login-password-error"
                  className="mt-1 block text-sm text-red-700"
                >
                  {errors.password.message}
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
              className="mx-auto !mt-[50px] block h-[32px] w-[328px] max-w-full bg-black px-6 text-[16px] font-medium text-white disabled:opacity-50"
            >
              {isSubmitting ? "LOADING..." : "LOGIN"}
            </button>
          </form>
          <p className="mt-[29px] text-center text-[16px]">
            Not registered yet?{" "}
            <Link to="/signup" className="ml-[14px] font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};
export default Login;
