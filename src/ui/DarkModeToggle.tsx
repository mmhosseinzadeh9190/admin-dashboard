import { useState, useEffect } from "react";
import { Moon, Sun1 } from "iconsax-react";
import Button from "./Button";
import { getUserDefaultTheme } from "../utils/helpers";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "auto") {
      const defaultTheme = getUserDefaultTheme();
      setIsDarkMode(defaultTheme === "dark" ? true : false);
    } else {
      setIsDarkMode(savedTheme === "dark" ? true : false);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);

    document.documentElement.classList = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Button
      onClick={toggleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 hover:bg-gray-100"
    >
      {isDarkMode ? (
        <Sun1 size="20" className="text-primary-800" />
      ) : (
        <Moon size="20" className="text-primary-800" />
      )}
    </Button>
  );
};

export default DarkModeToggle;
