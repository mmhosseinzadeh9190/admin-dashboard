import { Add, Trash } from "iconsax-react";
import Button from "../../ui/Button";
import { useRef } from "react";
import { addDefaultSrc } from "../../utils/helpers";

interface AddTeamModalContentTeamLogoProps {
  logo: File | null;
  handleAddLogo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveLogo: () => void;
  disabled: boolean;
}

function AddTeamModalContentTeamLogo({
  logo,
  handleAddLogo,
  handleRemoveLogo,
  disabled,
}: AddTeamModalContentTeamLogoProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClickInput = () => {
    fileInputRef.current?.click();
  };

  const placeholderImage = "/public/imagePlaceholder.png";

  return (
    <div className="flex flex-col gap-3">
      <span className="cursor-default text-sm font-medium tracking-0.1 text-gray-800">
        Logo
      </span>

      <div className="flex flex-wrap gap-3">
        {logo ? (
          <div className="group relative">
            <img
              src={URL.createObjectURL(logo) || placeholderImage}
              alt=""
              onError={(e) => addDefaultSrc(e, "image")}
              className="h-36 rounded-lg"
            />
            {!disabled && (
              <Button
                onClick={() => handleRemoveLogo()}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-gray-100 p-1.5 text-gray-700 shadow-md transition-all duration-100 hover:text-error-700 focus:outline-none"
              >
                <Trash size="18" variant="Linear" />
              </Button>
            )}
          </div>
        ) : (
          <>
            <input
              aria-label="Team logo"
              type="file"
              accept=".jpeg, .jpg, .png, .webp"
              disabled={disabled}
              onChange={handleAddLogo}
              className="hidden"
              ref={fileInputRef}
            />
            <Button
              onClick={handleClickInput}
              disabled={disabled}
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
  );
}

export default AddTeamModalContentTeamLogo;
