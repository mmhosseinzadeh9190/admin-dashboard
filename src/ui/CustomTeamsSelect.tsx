import { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ArrowDown2 } from "iconsax-react";
import { addDefaultSrc, capitalizeAllFirstLetters } from "../utils/helpers";
import { iconColor } from "../styles/GlobalStyles";
import { Team } from "../services/apiTeams";
import { useNavigate } from "react-router-dom";

interface CustomTeamsSelectProps {
  teams: Team[] | undefined;
  onTeamSelect: (team: Team) => void;
  disabled: boolean;
}

function CustomTeamsSelect({
  teams,
  onTeamSelect,
  disabled,
}: CustomTeamsSelectProps) {
  const [selected, setSelected] = useState(teams![0]);
  const navigate = useNavigate();

  const placeholderImage = "/public/imagePlaceholder.png";

  const handleChange = (team: Team) => {
    setSelected(team);
    onTeamSelect(team);
  };

  const handleLinkClick = () => {
    const searchParams = new URLSearchParams();
    searchParams.set("mode", "create-team");
    navigate(`/dashboard?${searchParams.toString()}`);
  };

  return (
    <div className="w-full">
      {teams?.length! > 0 ? (
        <Listbox value={selected} onChange={handleChange}>
          <ListboxButton
            disabled={disabled}
            className="relative flex w-full items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-100 py-2.5 pl-3.5 pr-10 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-md">
              <img
                src={selected.team_logo || placeholderImage}
                alt=""
                onError={(e) => addDefaultSrc(e, "image")}
                className="h-5 rounded-md object-cover object-center"
              />
            </span>

            <span className="truncate font-roboto text-sm tracking-0.1 text-gray-800">
              {capitalizeAllFirstLetters(selected.name!)}
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-3.5 top-3"
            >
              <ArrowDown2 size="16" color={iconColor} variant="Linear" />
            </span>
          </ListboxButton>
          <ListboxOptions
            anchor="top"
            transition
            className="z-30 -mt-2.5 w-[var(--button-width)] rounded-lg border border-gray-200 bg-white p-1 shadow-[0_5px_15px_0] shadow-gray-800/10 focus:outline-none"
          >
            {teams?.map((team) => (
              <ListboxOption
                key={team.id}
                value={team}
                className="group cursor-pointer select-none rounded-md px-3 py-1.5 hover:bg-gray-200"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md">
                    <img
                      src={team.team_logo || placeholderImage}
                      alt=""
                      onError={(e) => addDefaultSrc(e, "image")}
                      className="h-5 rounded-md object-cover object-center"
                    />
                  </span>
                  <span className="truncate font-roboto text-sm tracking-0.1 text-gray-700 group-hover:text-gray-800">
                    {capitalizeAllFirstLetters(team.name!)}
                  </span>
                </div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      ) : (
        <p className="rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 font-roboto text-sm tracking-0.1 text-gray-800">
          You do not currently have a team. Please follow this{" "}
          <span
            onClick={handleLinkClick}
            className="cursor-pointer font-medium text-primary-800 hover:text-primary-900 hover:underline"
          >
            link
          </span>{" "}
          to create your own team.
        </p>
      )}
    </div>
  );
}

export default CustomTeamsSelect;
