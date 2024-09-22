import { useState } from "react";
import { useSignInWithFacebook } from "../features/authentication/useSignInWithFacebook";
import { useSignInWithTwitter } from "../features/authentication/useSignInWithTwitter";
import { useSignInWithGitHub } from "../features/authentication/useSignInWithGitHub";
import { useSignUpWithPassword } from "../features/authentication/useSignUpWithPassword";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { Eye, EyeSlash } from "iconsax-react";
import { iconColor } from "../styles/GlobalStyles";
import Spinner from "../ui/Spinner";
import toast from "react-hot-toast";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signUpWithPassword, isPending } = useSignUpWithPassword();
  const { signInWithFacebook } = useSignInWithFacebook();
  const { signInWithTwitter } = useSignInWithTwitter();
  const { signInWithGitHub } = useSignInWithGitHub();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleFacebookSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signInWithFacebook();
  };

  const handleTwitterSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signInWithTwitter();
  };

  const handleGitHubSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signInWithGitHub();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    signUpWithPassword({ email, password, name });
  };

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-8 bg-gray-100">
      <Logo />

      <div className="flex w-max flex-col gap-4 rounded-xl bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-center text-lg font-semibold text-gray-900">
          Create your account
        </h1>

        <div className="flex flex-wrap gap-4">
          <div className="flex w-full gap-4">
            <Button
              type="submit"
              onClick={handleFacebookSignUp}
              disabled={isPending}
              className="flex w-1/2 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200"
            >
              <img
                src="/src/assets/facebook.svg"
                alt=""
                role="button"
                className="h-5"
              />
              <span>Sign up with Facebook</span>
            </Button>

            <Button
              type="submit"
              onClick={handleTwitterSignUp}
              disabled={isPending}
              className="flex w-1/2 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200"
            >
              <img
                src="/src/assets/twitter.svg"
                alt=""
                role="button"
                className="h-5"
              />
              <span>Sign up with Twitter</span>
            </Button>
          </div>

          <Button
            type="submit"
            onClick={handleGitHubSignUp}
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200"
          >
            <img
              src="/src/assets/github.svg"
              alt=""
              role="button"
              className="h-5"
            />
            <span>Sign up with GitHub</span>
          </Button>
        </div>

        <div className="flex items-center">
          <hr className="block h-px w-full bg-gray-100"></hr>
          <p className="px-3 text-center font-roboto text-gray-600">or</p>
          <hr className="block h-px w-full bg-gray-100"></hr>
        </div>

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
                className="rounded-xl border border-gray-200 bg-gray-100 px-3.5 py-2.5 font-roboto text-sm tracking-0.1 text-gray-800 placeholder:font-light placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
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
                className="rounded-xl border border-gray-200 bg-gray-100 px-3.5 py-2.5 font-roboto text-sm tracking-0.1 text-gray-800 placeholder:font-light placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
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
      </div>
    </div>
  );
}

export default SignUp;
