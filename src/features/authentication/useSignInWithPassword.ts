import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInWithPassword as signInWithPasswordApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface mutationFnProps {
  email: string;
  password: string;
}

export function useSignInWithPassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signInWithPassword, isPending } = useMutation({
    mutationFn: ({ email, password }: mutationFnProps) =>
      signInWithPasswordApi({ email, password }),
    onSuccess(data) {
      navigate("/dashboard");
      queryClient.setQueryData(["user"], data.user);
      toast.success("Login was successful!");
    },
    onError: (error) => {
      console.error(
        "Error logging in with Email and Password: ",
        error.message,
      );
      if (error.message === "Failed to fetch") {
        toast.error("Unable to connect. Please try again later.");
        return;
      } else {
        toast.error("Provided email or password are incorrect");
      }
    },
  });

  return { signInWithPassword, isPending };
}

export default useSignInWithPassword;
