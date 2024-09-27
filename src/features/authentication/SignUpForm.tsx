import { useState } from "react";
import Button from "../../ui/Button";
import { Eye, EyeSlash } from "iconsax-react";
import { iconColor } from "../../styles/GlobalStyles";
import Spinner from "../../ui/Spinner";
import { Link } from "react-router-dom";

interface SignUpFormProps {
  isPending: boolean;
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function SignUpForm({
  isPending,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleSubmit,
}: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="font-roboto text-sm tracking-0.1 text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isPending}
          className="w-full rounded-xl border border-gray-200 bg-gray-100 px-3.5 py-2.5 font-roboto text-sm tracking-0.1 text-gray-800 placeholder:font-light placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
          placeholder="Enter your name"
          required
        />
      </div>

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

      <div className="flex gap-4">
        <div className="relative flex w-full flex-col gap-2">
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
            className="rounded-xl border border-gray-200 bg-gray-100 py-2.5 pl-3.5 pr-11 font-roboto text-sm tracking-0.1 text-gray-800 placeholder:font-light placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
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

        <div className="relative flex w-full flex-col gap-2">
          <label
            htmlFor="confirmPassword"
            className="font-roboto text-sm tracking-0.1 text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isPending}
            className="rounded-xl border border-gray-200 bg-gray-100 py-2.5 pl-3.5 pr-11 font-roboto text-sm tracking-0.1 text-gray-800 placeholder:font-light placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
            placeholder="Confirm your password"
            required
          />
          <Button
            onClick={toggleConfirmPasswordVisibility}
            className="absolute bottom-3 right-3.5 focus:outline-none"
          >
            {showConfirmPassword ? (
              <EyeSlash size="16" color={iconColor} variant="Linear" />
            ) : (
              <Eye size="16" color={iconColor} variant="Linear" />
            )}
          </Button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-primary-800 py-3 text-center text-sm font-semibold text-gray-100 hover:bg-primary-900 disabled:cursor-not-allowed"
      >
        {!isPending ? (
          "Create your account"
        ) : (
          <Spinner size="20" stroke="2" color="#FAF4FF" />
        )}
      </Button>

      <p className="flex items-center gap-1 font-roboto text-sm tracking-0.1 text-gray-700">
        <span>Already have an account?</span>
        <Link
          to="/login"
          className="font-medium text-primary-800 hover:underline"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}

export default SignUpForm;
