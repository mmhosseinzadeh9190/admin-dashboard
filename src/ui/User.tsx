import { User as UserType } from "../services/apiUsers";
import { addDefaultSrc, capitalizeAllFirstLetters } from "../utils/helpers";

type UserProps = {
  user: UserType;
};

function User({ user }: UserProps) {
  const name = capitalizeAllFirstLetters(user?.name!).split(" ")[0];
  const placeholder = "/public/avatarPlaceholder.png";
  const userAvatar = user?.avatar_url || placeholder;

  return (
    <div className="flex items-center gap-2">
      <img
        src={userAvatar}
        alt=""
        onError={(e) => addDefaultSrc(e, "avatar")}
        className="h-9 w-9 rounded-full border border-gray-200 object-cover object-center"
      />
      <span className="font-roboto text-sm font-medium tracking-0.1 text-gray-800">
        {name}
      </span>
    </div>
  );
}

export default User;
