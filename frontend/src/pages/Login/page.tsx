import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import Logo from "../../components/Logo";
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
          isAxiosError(error) && error.response?.status === 400
            ? "Invalid email or password."
            : "Unable to sign in. Try again.",
      });
    }
  };
  return (
    <main className="grid min-h-screen bg-[#FFF3E3] lg:grid-cols-2">
      <div
        className="hidden min-h-screen bg-cover bg-center lg:block"
        style={{ backgroundImage: "url('/Images/Hero.jpg')" }}
      />
      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-12 inline-flex">
            <Logo />
          </Link>
          <h1 className="mb-8 text-4xl font-semibold">Login</h1>
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
                  errors.email ? "login-email-error" : undefined
                }
                className="mt-2 w-full border-b border-black bg-transparent px-1 py-3 outline-none"
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
              Password
              <input
                {...register("password")}
                type="password"
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "login-password-error" : undefined
                }
                className="mt-2 w-full border-b border-black bg-transparent px-1 py-3 outline-none"
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
              className="w-full bg-black px-6 py-4 font-medium text-white disabled:opacity-50"
            >
              {isSubmitting ? "LOADING..." : "LOGIN"}
            </button>
          </form>
          <p className="mt-6 text-sm">
            Not registered yet?{" "}
            <Link to="/signup" className="font-semibold underline">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};
export default Login;
