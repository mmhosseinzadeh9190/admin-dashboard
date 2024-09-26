import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import { Eye, EyeSlash } from "iconsax-react";
import { iconColor } from "../../styles/GlobalStyles";
import Spinner from "../../ui/Spinner";

interface LoginFormProps {
  isPending: boolean;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  rememberMe: boolean;
  setRememberMe: (rememberMe: boolean) => void;
}

function LoginForm({
  isPending,
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  rememberMe,
  setRememberMe,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="font-roboto text-sm tracking-0.1 text-gray-700"
        >
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
          className="w-full rounded-xl border border-gray-200 bg-gray-100 px-3.5 py-2.5 font-roboto text-sm tracking-0.1 text-gray-800 placeholder:font-light placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="relative flex flex-col gap-2">
        <label
          htmlFor="password"
          className="font-roboto text-sm tracking-0.1 text-gray-700"
        >
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
          className="w-full rounded-xl border border-gray-200 bg-gray-100 py-2.5 pl-3.5 pr-11 font-roboto text-sm tracking-0.1 text-gray-800 placeholder:font-light placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
          placeholder="Enter your password"
          required
        />
        <Button
          onClick={togglePasswordVisibility}
          className="absolute bottom-3 right-3.5 focus:outline-none"
        >
          {showPassword ? (
            <EyeSlash size="16" color={iconColor} variant="Linear" />
          ) : (
            <Eye size="16" color={iconColor} variant="Linear" />
          )}
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            id="remember"
            aria-describedby="remember"
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            disabled={isPending}
            className="h-3.5 w-3.5 accent-primary-800 disabled:cursor-not-allowed"
          />
          <label
            htmlFor="remember"
            className="font-roboto text-sm tracking-0.1 text-gray-700"
          >
            Remember Me
          </label>
        </div>

        <Link
          to="/passwordRecovery"
          className="font-roboto text-sm font-medium tracking-0.1 text-primary-800 hover:underline"
        >
          Forgot Password
        </Link>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-primary-800 py-3 text-center text-sm font-semibold text-gray-100 hover:bg-primary-900 disabled:cursor-not-allowed"
      >
        {!isPending ? (
          "Log in to your account"
        ) : (
          <Spinner size="20" stroke="2" color="#FAF4FF" />
        )}
      </Button>

      <p className="flex items-center gap-1 font-roboto text-sm tracking-0.1 text-gray-700">
        <span>Don’t have an account yet?</span>
        <Link
          to="/signup"
          className="font-medium text-primary-800 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
