import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUpWithPassword as signUpWithPasswordApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface mutationFnProps {
  email: string;
  password: string;
  name: string;
}

export function useSignUpWithPassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signUpWithPassword, isPending } = useMutation({
    mutationFn: ({ email, password, name }: mutationFnProps) =>
      signUpWithPasswordApi({ email, password, name }),
    onSuccess(data) {
      navigate("/dashboard");
      queryClient.setQueryData(["user"], data.user);
      toast.success("Registration was successful!");
    },
    onError: (error) => {
      console.error(
        "Error signing up with Email and Password: ",
        error.message,
      );
      switch (error.message) {
        case "Failed to fetch":
          toast.error("Unable to connect. Please try again later.");
          break;
        case "User already registered":
          toast.error("Email already registered.");
          break;
        default:
          toast.error("Registration failed. Please try again later.");
      }
    },
  });

  return { signUpWithPassword, isPending };
}

export default useSignUpWithPassword;
