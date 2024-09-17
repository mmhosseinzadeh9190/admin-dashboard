import { useState, useEffect } from "react";
import useSignInWithFacebook from "../features/authentication/useSignInWithFacebook";
import useSignInWithTwitter from "../features/authentication/useSignInWithTwitter";
import useSignInWithGitHub from "../features/authentication/useSignInWithGitHub";
import useSignInWithPassword from "../features/authentication/useSignInWithPassword";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { Eye, EyeSlash } from "iconsax-react";
import { iconColor } from "../styles/GlobalStyles";
import Spinner from "../ui/Spinner";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("mohammadmahdihosseinzadeh68@gmail.com");
  const [password, setPassword] = useState("HOSSEIN_H.Z.9190");
  const { signInWithPassword, isPending } = useSignInWithPassword();
  const { signInWithGitHub } = useSignInWithGitHub();
  const { signInWithTwitter } = useSignInWithTwitter();
  const { signInWithFacebook } = useSignInWithFacebook();

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFacebookLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signInWithFacebook();
  };

  const handleTwitterLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signInWithTwitter();
  };

  const handleGitHubLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signInWithGitHub();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;

    if (rememberMe) {
      localStorage.setItem("savedEmail", email);
    } else {
      localStorage.removeItem("savedEmail");
    }

    signInWithPassword({ email, password });
  };

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-8 bg-gray-100">
      <Logo />

      <div className="flex w-max flex-col gap-4 rounded-xl bg-white px-6 py-8 shadow-sm">
        <h1 className="mb-4 text-center text-lg font-semibold text-gray-900">
          Login to your account
        </h1>

        <div className="flex flex-wrap gap-4">
          <div className="flex w-full gap-4">
            <Button
              type="submit"
              onClick={handleFacebookLogin}
              disabled={isPending}
              className="flex w-1/2 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200"
            >
              <img
                src="/src/assets/facebook.svg"
                alt=""
                role="button"
                className="h-5"
              />
              <span>Log in with Facebook</span>
            </Button>

            <Button
              type="submit"
              onClick={handleTwitterLogin}
              disabled={isPending}
              className="flex w-1/2 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200"
            >
              <img
                src="/src/assets/twitter.svg"
                alt=""
                role="button"
                className="h-5"
              />
              <span>Log in with Twitter</span>
            </Button>
          </div>

          <Button
            type="submit"
            onClick={handleGitHubLogin}
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200"
          >
            <img
              src="/src/assets/github.svg"
              alt=""
              role="button"
              className="h-5"
            />
            <span>Log in with GitHub</span>
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
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-3.5 py-2.5 font-roboto text-sm tracking-0.1 text-gray-800 placeholder:font-light placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
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
                onChange={() => setRememberMe((prev) => !prev)}
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
            className="w-full rounded-xl bg-primary-800 px-4 py-3 text-center text-sm font-semibold text-gray-100 hover:bg-primary-900 disabled:cursor-not-allowed"
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
      </div>
    </div>
  );
}

export default Login;
