import { useState, useEffect } from "react";
import { useSignInWithFacebook } from "../features/authentication/useSignInWithFacebook";
import { useSignInWithTwitter } from "../features/authentication/useSignInWithTwitter";
import { useSignInWithGitHub } from "../features/authentication/useSignInWithGitHub";
import { useSignInWithPassword } from "../features/authentication/useSignInWithPassword";
import Logo from "../ui/Logo";
import SocialLoginButtons from "../features/authentication/SocialLoginButtons";
import LoginForm from "../features/authentication/LoginForm";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { signInWithPassword, isPending } = useSignInWithPassword();
  const { signInWithFacebook } = useSignInWithFacebook();
  const { signInWithTwitter } = useSignInWithTwitter();
  const { signInWithGitHub } = useSignInWithGitHub();

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

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

    if (!email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

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

      <div className="flex w-max flex-col gap-4 rounded-xl bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-center text-lg font-semibold text-gray-900">
          Log in to your account
        </h1>

        <SocialLoginButtons
          isPending={isPending}
          handleFacebookLogin={handleFacebookLogin}
          handleTwitterLogin={handleTwitterLogin}
          handleGitHubLogin={handleGitHubLogin}
        />

        <div className="flex items-center">
          <hr className="block h-px w-full bg-gray-100"></hr>
          <p className="px-3 text-center font-roboto text-gray-600">or</p>
          <hr className="block h-px w-full bg-gray-100"></hr>
        </div>

        <LoginForm
          isPending={isPending}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
        />
      </div>
    </div>
  );
}

export default Login;
