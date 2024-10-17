import { Danger } from "iconsax-react";

function Messages() {
  return (
    <div className="flex h-full items-center justify-center">
      <span className="flex items-center gap-2">
        <Danger size="20" color="#44444f" variant="Linear" />
        <span className="font-roboto text-lg font-semibold tracking-0.1 text-gray-800">
          The Messages page is under development. Thank you for your patience!
        </span>
      </span>
    </div>
  );
}

export default Messages;
