import { useUser } from "../features/authentication/useUser";
import { addDefaultSrc, capitalizeAllFirstLetters } from "../utils/helpers";

function User() {
  const { user } = useUser();

  const name = capitalizeAllFirstLetters(user?.user_metadata.name).split(
    " ",
  )[0];
  const placeholder = "/public/avatarPlaceholder.png";
  const userAvatar = user?.user_metadata.avatar_url || placeholder;

  return (
    <div className="flex items-center gap-2">
      <img
        src={userAvatar}
        alt=""
        onError={(e) => addDefaultSrc(e, "avatar")}
        className="h-9 w-9 rounded-full object-cover object-center"
      />
      <span className="font-roboto text-sm font-medium tracking-0.1 text-gray-800">
        {name}
      </span>
    </div>
  );
}

export default User;
