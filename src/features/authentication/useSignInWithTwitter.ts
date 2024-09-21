import { useMutation } from "@tanstack/react-query";
import { signInWithTwitter as signInWithTwitterApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignInWithTwitter() {
  const { mutate: signInWithTwitter, isPending } = useMutation({
    mutationFn: () => signInWithTwitterApi(),
    onError: (error) => {
      console.error("Error logging in with Twitter: ", error.message);
      toast.error("Login failed. Please try again later.");
    },
  });

  return { signInWithTwitter, isPending };
}

export default useSignInWithTwitter;
