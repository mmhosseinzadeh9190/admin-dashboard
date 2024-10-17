import { useState, useEffect } from "react";
import { Moon, Sun1 } from "iconsax-react";
import Button from "./Button";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);

    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <Button
      onClick={toggleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 hover:bg-gray-100"
    >
      {isDarkMode ? (
        <Sun1 size="20" color="#6a0dad" variant="Linear" />
      ) : (
        <Moon size="20" color="#6a0dad" variant="Linear" />
      )}
    </Button>
  );
};

export default DarkModeToggle;
