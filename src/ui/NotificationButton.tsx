import { Notification } from "iconsax-react";
import Button from "./Button";

function NotificationButton() {
  return (
    <Button className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 hover:bg-gray-100">
      <Notification size="20" color="#6a0dad" variant="Linear" />
    </Button>
  );
}

export default NotificationButton;
