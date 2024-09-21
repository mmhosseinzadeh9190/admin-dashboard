import { useMutation } from "@tanstack/react-query";
import { signInWithFacebook as signInWithFacebookApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignInWithFacebook() {
  const { mutate: signInWithFacebook, isPending } = useMutation({
    mutationFn: () => signInWithFacebookApi(),
    onError: (error) => {
      console.error("Error logging in with Facebook: ", error.message);
      toast.error("Login failed. Please try again later.");
    },
  });

  return { signInWithFacebook, isPending };
}

export default useSignInWithFacebook;
