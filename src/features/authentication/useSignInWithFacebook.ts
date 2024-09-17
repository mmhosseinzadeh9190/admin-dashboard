import { useMutation } from "@tanstack/react-query";
import { signInWithFacebook as signInWithFacebookApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignInWithFacebook() {
  const { mutate: signInWithFacebook, isPending } = useMutation({
    mutationFn: () => signInWithFacebookApi(),
    onSuccess(data) {
      console.log("User successfully logged in", data);
    },
    onError: (error) => {
      console.error("Error logging in with Facebook: ", error.message);
      toast.error(
        "Login failed. Please ensure your Facebook account is correctly linked.",
      );
    },
  });

  return { signInWithFacebook, isPending };
}

export default useSignInWithFacebook;
