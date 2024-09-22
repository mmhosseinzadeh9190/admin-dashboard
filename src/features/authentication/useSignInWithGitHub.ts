import { useMutation } from "@tanstack/react-query";
import { signInWithGitHub as signInWithGitHubApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignInWithGitHub() {
  const { mutate: signInWithGitHub, isPending } = useMutation({
    mutationFn: () => signInWithGitHubApi(),
    onError: (error) => {
      console.error("Error logging in with GitHub: ", error.message);
      toast.error("Login failed. Please try again later.");
    },
  });

  return { signInWithGitHub, isPending };
}
