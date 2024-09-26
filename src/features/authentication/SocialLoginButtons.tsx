import React from "react";
import Button from "../../ui/Button";

interface SocialLoginButtonsProps {
  isPending: boolean;
  handleFacebookLogin: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleTwitterLogin: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleGitHubLogin: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function SocialLoginButtons({
  isPending,
  handleFacebookLogin,
  handleTwitterLogin,
  handleGitHubLogin,
}: SocialLoginButtonsProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex w-full gap-4">
        <Button
          onClick={handleFacebookLogin}
          disabled={isPending}
          className="flex w-1/2 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200"
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
          onClick={handleTwitterLogin}
          disabled={isPending}
          className="flex w-1/2 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200"
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
        onClick={handleGitHubLogin}
        disabled={isPending}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200"
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
  );
}

export default SocialLoginButtons;
