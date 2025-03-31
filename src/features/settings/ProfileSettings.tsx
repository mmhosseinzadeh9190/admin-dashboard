import { useRef, useState } from "react";
import Button from "../../ui/Button";
import { addDefaultSrc, capitalizeAllFirstLetters } from "../../utils/helpers";
import { Add, Trash } from "iconsax-react";
import PreMadeButtons from "../../ui/PreMadeButtons";
import toast from "react-hot-toast";
import supabase from "../../services/supabase";
import { User } from "@supabase/supabase-js";

type ProfileSettingsProps = {
  user: User | null | undefined;
  userRefetch: () => void;
};

function ProfileSettings({ user, userRefetch }: ProfileSettingsProps) {
  const currentAvatar = user?.user_metadata.avatar_url;
  const currentName = capitalizeAllFirstLetters(user?.user_metadata.name);
  const [avatar, setAvatar] = useState<string | null>(currentAvatar);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [name, setName] = useState<string>(currentName || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const disableButton =
    avatar === currentAvatar && (name === currentName || name === "");

  const placeholder = "/public/avatarPlaceholder.png";

  const handleClickInput = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
  };

  const handleAddAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setAvatarFile(file!);
    const fileUrl = URL.createObjectURL(file!);
    setAvatar(fileUrl);
  };

  const handleImageUpload = async (image: File) => {
    const uniqueSuffix = Date.now();
    const newFileName = `${uniqueSuffix}-${image.name}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(newFileName, image);

    if (error) {
      return null;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(newFileName);

    return { publicUrl: data.publicUrl };
  };

  const handleUpdateName = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: { name: name },
      });
      if (error) {
        throw new Error(error.message);
      }
      setName(name);
    } catch (error) {
      throw new Error();
    }
  };

  const handleUpdateAvatar = async (avatarUrl: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: { avatar_url: avatarUrl },
      });
      if (error) {
        throw new Error(error.message);
      }
      setAvatar(avatarUrl);
    } catch (error) {
      throw new Error();
    }
  };

  const handleAddAvatarToDatabase = async () => {
    const uploadResult = await handleImageUpload(avatarFile!);

    if (uploadResult && uploadResult.publicUrl) {
      handleUpdateAvatar(uploadResult.publicUrl);
    } else {
      throw new Error();
    }
  };

  const handleDeleteAvatarFromDatabase = async () => {
    if (
      avatar !==
      "https://grrbotnrdjqbvjpugvan.supabase.co/storage/v1/object/public/avatars//user-placeholder.png"
    ) {
      const { error: storageDeleteError } = await supabase.storage
        .from("avatars")
        .remove([`${avatar?.split("/").pop()}`]);

      if (storageDeleteError) {
        throw new Error(storageDeleteError.message);
      }

      const avatarPlaceholder =
        "https://grrbotnrdjqbvjpugvan.supabase.co/storage/v1/object/public/avatars//user-placeholder.png";

      handleUpdateAvatar(avatarPlaceholder);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setIsSubmitting(true);

      if (avatar !== currentAvatar) {
        await handleDeleteAvatarFromDatabase();
        if (avatarFile) {
          await handleAddAvatarToDatabase();
        }
      }

      if (name !== currentName) {
        await handleUpdateName();
      }

      toast.success("Profile updated successfully!");
      userRefetch();
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-3xl border border-gray-200 bg-gray-100">
      <div className="flex items-center justify-between px-5 pt-4">
        <h2 className="font-semibold capitalize tracking-0.1 text-gray-700">
          Profile Settings
        </h2>
      </div>

      <div className="px-1.5 pb-1.5">
        <div className="flex flex-col gap-6 rounded-3xl bg-white p-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-roboto text-sm font-semibold tracking-0.1 text-gray-900">
              Profile Picture
            </h3>
            <div className="flex flex-wrap gap-3">
              {avatar ? (
                <div className="group relative">
                  <img
                    src={avatar || placeholder}
                    alt=""
                    onError={(e) => addDefaultSrc(e, "avatar")}
                    className="h-36 rounded-xl"
                  />
                  {!isSubmitting && (
                    <Button
                      onClick={() => handleRemoveAvatar()}
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-gray-100 p-1.5 text-gray-700 shadow-md transition-all duration-100 hover:text-error-700 focus:outline-none"
                    >
                      <Trash size="18" variant="Linear" />
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  <input
                    aria-label="User Avatar"
                    type="file"
                    accept=".jpeg, .jpg, .png, .webp"
                    disabled={isSubmitting}
                    onChange={handleAddAvatar}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <Button
                    onClick={handleClickInput}
                    disabled={isSubmitting}
                    className="group flex min-h-36 min-w-48 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-100 transition-all duration-100 hover:border-gray-400 disabled:cursor-not-allowed disabled:bg-gray-200"
                  >
                    <span className="text-gray-600 transition-all duration-100 group-hover:text-gray-700">
                      <Add size="28" variant="Linear" />
                    </span>
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="full-name"
              className="font-roboto text-sm font-semibold tracking-0.1 text-gray-900"
            >
              Profile Name
            </label>
            <input
              type="text"
              name="Full Name"
              id="full-name"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-3.5 py-2.5 font-roboto text-sm tracking-0.1 text-gray-800 placeholder:font-light placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
              placeholder="Enter new full name"
            />
          </div>
          <div className="flex justify-end">
            <PreMadeButtons
              type="confirm"
              text="Confirm"
              onClick={handleUpdateProfile}
              disabled={isSubmitting || disableButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
