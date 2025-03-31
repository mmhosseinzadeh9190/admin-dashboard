import { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { addDefaultSrc, updateTheme } from "../../utils/helpers";

type Theme = {
  name: string;
  url: string;
};

const themes: Theme[] = [
  {
    name: "light",
    url: "https://cdn.sstatic.net/Img/preferences/theme-light.svg?v=2d017a78abab",
  },
  {
    name: "auto",
    url: "https://cdn.sstatic.net/Img/preferences/theme-system@2x.png?v=358fa5ee5f7b",
  },
  {
    name: "dark",
    url: "https://cdn.sstatic.net/Img/preferences/theme-dark.svg?v=9a46fd615a91",
  },
];

function ThemePreferences() {
  const [selectedTheme, setSelectedTheme] = useState(themes[1]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const theme = themes.find((t) => t.name === savedTheme) || themes[1];
    setSelectedTheme(theme);
    updateTheme(theme.name);
  }, []);

  useEffect(() => {
    const prefersTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const handlePrefersThemeChange = () => {
      setSelectedTheme(themes[1]);
      updateTheme("auto");
    };
    prefersTheme.addEventListener("change", handlePrefersThemeChange);
    return () => {
      prefersTheme.removeEventListener("change", handlePrefersThemeChange);
    };
  }, []);

  const handleThemeChange = (theme: Theme) => {
    setSelectedTheme(theme);
    updateTheme(theme.name);
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-3xl border border-gray-200 bg-gray-100">
      <div className="flex items-center justify-between px-5 pt-4">
        <h2 className="font-semibold capitalize tracking-0.1 text-gray-700">
          Theme Preferences
        </h2>
      </div>

      <div className="px-1.5 pb-1.5">
        <RadioGroup
          value={selectedTheme}
          onChange={handleThemeChange}
          aria-label="Radio Group"
          className="flex gap-8 rounded-3xl bg-white p-4"
        >
          {themes.map((theme) => (
            <Radio
              key={theme.name}
              value={theme}
              className="group flex cursor-pointer focus:outline-none"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex size-5 items-center justify-center rounded-full border-2 border-gray-600 group-data-[checked]:border-success-600">
                    <span className="size-3 rounded-full bg-success-600 opacity-0 group-data-[checked]:opacity-100"></span>
                  </span>
                  <img
                    src={theme.url}
                    alt={theme.name}
                    onError={(e) => addDefaultSrc(e, "image")}
                    className="h-28 w-40 rounded-xl opacity-75 shadow group-hover:opacity-100 group-data-[checked]:opacity-100"
                  />
                </div>
                <p className="ml-8 font-roboto text-sm font-semibold capitalize tracking-0.1 text-gray-900">
                  {theme.name}
                </p>
              </div>
            </Radio>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

export default ThemePreferences;
