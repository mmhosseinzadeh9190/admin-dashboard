import User from "./User";

function Header() {
  return (
    <header className="bored flex items-center justify-end gap-4 border-b-[1px] border-gray-200 px-10 py-4">
      <button
        className="tracking-0.1 flex items-center gap-2 rounded-[10px] bg-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-300 disabled:cursor-not-allowed"
        type="button"
      >
        <img src="/src/assets/search.svg" alt="" />
        Find
      </button>

      <button
        className="tracking-0.1 flex items-center gap-2 rounded-[10px] bg-primary-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-900 disabled:cursor-not-allowed"
        type="button"
      >
        <img src="/src/assets/plus.svg" alt="" />
        New
      </button>

      <User />
    </header>
  );
}

export default Header;
