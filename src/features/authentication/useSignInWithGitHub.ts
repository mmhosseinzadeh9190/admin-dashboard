import { useMutation } from "@tanstack/react-query";
import { signInWithGitHub as signInWithGitHubApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignInWithGitHub() {
  const { mutate: signInWithGitHub, isPending } = useMutation({
    mutationFn: () => signInWithGitHubApi(),
    onSuccess(data) {
      console.log("User successfully logged in", data);
    },
    onError: (error) => {
      console.error("Error logging in with GitHub: ", error.message);
      toast.error(
        "Login failed. Please ensure your GitHub account is correctly linked.",
      );
    },
  });

  return { signInWithGitHub, isPending };
}

export default useSignInWithGitHub;
