import Button from "../../ui/Button";
import { Logout as LogoutIcon } from "iconsax-react";
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
      className={`mt-auto flex items-center ${isPending ? "justify-center" : ""} gap-3 rounded-md px-6 py-3 tracking-0.1 text-error-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-100`}
      onClick={handleLogout}
      disabled={isPending}
    >
      {!isPending ? (
        <>
          <span className="text-error-600">
            <LogoutIcon size="24" variant="Bulk" />
          </span>
          <span className="-mb-px">Logout</span>
        </>
      ) : (
        <Spinner size="24" stroke="2" />
      )}
    </Button>
  );
}

export default Logout;
