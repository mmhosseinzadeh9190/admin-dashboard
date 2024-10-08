import Button from "./Button";
import User from "./User";

function Header() {
  return (
    <header className="bored flex items-center justify-end gap-4 border-b border-gray-200 px-12 py-3">
      <Button className="flex items-center gap-2 rounded-[10px] bg-gray-200 px-3.5 py-2 text-sm font-semibold tracking-0.1 text-gray-700 hover:bg-gray-300 disabled:cursor-not-allowed">
        <img src="/src/assets/search.svg" alt="" role="button" />
        <span>Find</span>
      </Button>

      <Button className="flex items-center gap-2 rounded-[10px] bg-primary-800 px-3.5 py-2 text-sm font-semibold tracking-0.1 text-white hover:bg-primary-900 disabled:cursor-not-allowed">
        <img src="/src/assets/plus.svg" alt="" role="button" />
        <span>New</span>
      </Button>

      <User />
    </header>
  );
}

export default Header;
