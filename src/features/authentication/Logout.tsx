import Button from "../../ui/Button";
import { LogoutCurve as LogoutIcon } from "iconsax-react";
import { useLogout } from "./useLogout";
import Spinner from "../../ui/Spinner";

function Logout() {
  const { logout, isPending } = useLogout();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
  };

  return (
    <Button
      className={`mt-auto flex items-center text-base/4 ${isPending ? "justify-center" : ""} gap-3 rounded-md px-5 py-3 font-medium tracking-0.1 text-error-600 hover:bg-gray-100 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100`}
      onClick={handleLogout}
      disabled={isPending}
    >
      {!isPending ? (
        <>
          <LogoutIcon size="20" variant="Linear" />
          <span>Logout</span>
        </>
      ) : (
        <Spinner size="24" stroke="2" />
      )}
    </Button>
  );
}

export default Logout;
