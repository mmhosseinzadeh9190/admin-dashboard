import { useState } from "react";
import { useSignInWithFacebook } from "../features/authentication/useSignInWithFacebook";
import { useSignInWithTwitter } from "../features/authentication/useSignInWithTwitter";
import { useSignInWithGitHub } from "../features/authentication/useSignInWithGitHub";
import { useSignUpWithPassword } from "../features/authentication/useSignUpWithPassword";
import Logo from "../ui/Logo";
import SocialAuthButtons from "../features/authentication/SocialAuthButtons";
import SignUpForm from "../features/authentication/SignUpForm";
import toast from "react-hot-toast";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUpWithPassword, isPending } = useSignUpWithPassword();
  const { signInWithFacebook } = useSignInWithFacebook();
  const { signInWithTwitter } = useSignInWithTwitter();
  const { signInWithGitHub } = useSignInWithGitHub();

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
      toast.error("Password and confirmation must be the same.");
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

        <SocialAuthButtons
          isPending={isPending}
          handleFacebookAuth={handleFacebookSignUp}
          handleTwitterAuth={handleTwitterSignUp}
          handleGitHubAuth={handleGitHubSignUp}
          actionType="signup"
        />

        <div className="flex items-center">
          <hr className="block h-px w-full bg-gray-100"></hr>
          <p className="px-3 text-center font-roboto text-gray-600">or</p>
          <hr className="block h-px w-full bg-gray-100"></hr>
        </div>

        <SignUpForm
          isPending={isPending}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default SignUp;
