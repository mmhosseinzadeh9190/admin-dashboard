import { useState } from "react";
import Button from "../../ui/Button";
import { Eye, EyeSlash, TickSquare } from "iconsax-react";
import toast from "react-hot-toast";
import supabase from "../../services/supabase";
import { signInWithPassword } from "../../services/apiAuth";
import { User } from "@supabase/supabase-js";

type ChangePasswordProps = {
  user: User | null | undefined;
  userRefetch: () => void;
};

function ChangePassword({ user, userRefetch }: ChangePasswordProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const email = user?.email!;
  const disableButton =
    (currentPassword && newPassword && confirmNewPassword) === "";

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword((prev) => !prev);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

  const toggleConfirmNewPasswordVisibility = () => {
    setShowConfirmNewPassword((prev) => !prev);
  };

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);

      if (currentPassword === newPassword) {
        toast.error("New password cannot match current.");
        return;
      }

      if (newPassword !== confirmNewPassword) {
        toast.error("New password and confirmation must be the same.");
        return;
      }

      try {
        await signInWithPassword({
          email,
          password: currentPassword,
        });
      } catch (error) {
        toast.error("Current password is incorrect.");
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        throw new Error(error.message);
      }

      toast.success("Password updated successfully!");
      userRefetch();
    } catch (error) {
      toast.error("Failed to update Password. Please try again.");
    } finally {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-3xl border border-gray-200 bg-gray-100">
      <div className="flex items-center justify-between px-5 pt-4">
        <h2 className="font-semibold capitalize tracking-0.1 text-gray-700">
          Change Password
        </h2>
      </div>

      <div className="h-full px-1.5 pb-1.5">
        <form
          className="flex h-full flex-col gap-6 rounded-3xl bg-white p-4"
          onSubmit={handleChangePassword}
        >
          <div className="relative flex w-full flex-col gap-2">
            <label
              htmlFor="current-password"
              className="font-roboto text-sm font-semibold tracking-0.1 text-gray-900"
            >
              Current Password
            </label>
            <input
              type={showCurrentPassword ? "text" : "password"}
              name="Current Password"
              id="current-password"
              autoComplete="off"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={isSubmitting}
              className="rounded-xl border border-gray-200 bg-gray-100 py-2.5 pl-3.5 pr-11 font-roboto text-sm tracking-0.1 text-gray-800 placeholder:font-light placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
              placeholder="Enter current password"
              required
            />
            <Button
              onClick={toggleCurrentPasswordVisibility}
              className="absolute bottom-3 right-3.5 focus:outline-none"
            >
              {showCurrentPassword ? (
                <EyeSlash size="16" className="text-gray-600" />
              ) : (
                <Eye size="16" className="text-gray-600" />
              )}
            </Button>
          </div>
          <div className="relative flex w-full flex-col gap-2">
            <label
              htmlFor="new-password"
              className="font-roboto text-sm font-semibold tracking-0.1 text-gray-900"
            >
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              name="New Password"
              id="new-password"
              autoComplete="off"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isSubmitting}
              className="rounded-xl border border-gray-200 bg-gray-100 py-2.5 pl-3.5 pr-11 font-roboto text-sm tracking-0.1 text-gray-800 placeholder:font-light placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
              placeholder="Enter new password"
              required
            />
            <Button
              onClick={toggleNewPasswordVisibility}
              className="absolute bottom-3 right-3.5 focus:outline-none"
            >
              {showNewPassword ? (
                <EyeSlash size="16" className="text-gray-600" />
              ) : (
                <Eye size="16" className="text-gray-600" />
              )}
            </Button>
          </div>
          <div className="relative flex w-full flex-col gap-2">
            <label
              htmlFor="confirm-new-password"
              className="font-roboto text-sm font-semibold tracking-0.1 text-gray-900"
            >
              Confirm New Password
            </label>
            <input
              type={showConfirmNewPassword ? "text" : "password"}
              name="Confirm New Password"
              id="confirm-new-password"
              autoComplete="off"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              disabled={isSubmitting}
              className="rounded-xl border border-gray-200 bg-gray-100 py-2.5 pl-3.5 pr-11 font-roboto text-sm tracking-0.1 text-gray-800 placeholder:font-light placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
              placeholder="Confirm new password"
              required
            />
            <Button
              onClick={toggleConfirmNewPasswordVisibility}
              className="absolute bottom-3 right-3.5 focus:outline-none"
            >
              {showConfirmNewPassword ? (
                <EyeSlash size="16" className="text-gray-600" />
              ) : (
                <Eye size="16" className="text-gray-600" />
              )}
            </Button>
          </div>
          <div className="mt-auto flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || disableButton}
              className="flex items-center justify-center gap-2 rounded-lg border border-success-100 bg-success-50 px-3.5 py-2.5 text-success-700 hover:bg-success-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-75"
            >
              <TickSquare size="16" variant="Linear" />
              <span className="text-sm font-medium tracking-0.1">Confirm</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
