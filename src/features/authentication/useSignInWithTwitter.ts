import { useMutation } from "@tanstack/react-query";
import { signInWithTwitter as signInWithTwitterApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignInWithTwitter() {
  const { mutate: signInWithTwitter, isPending } = useMutation({
    mutationFn: () => signInWithTwitterApi(),
    onSuccess(data) {
      console.log("User successfully logged in", data);
    },
    onError: (error) => {
      console.error("Error logging in with Twitter: ", error.message);
      toast.error(
        "Login failed. Please ensure your Twitter account is correctly linked.",
      );
    },
  });

  return { signInWithTwitter, isPending };
}

export default useSignInWithTwitter;
