import { Switch } from "~/components/ui/switch";
import { darkModeAtom } from "~/components/state/dark-mode";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { FaMoon } from "react-icons/fa6";
import { MdOutlineWbSunny } from "react-icons/md";

export const DarkModeSwitch = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  useMemo(() => {
    if (darkMode) {
      document.documentElement.dataset.theme = "dark";
    } else {
      document.documentElement.dataset.theme = "light";
    }
  }, [darkMode]);

  return (
    <div className="flex relative gap-2">
      {darkMode ? (
        <MdOutlineWbSunny
          size={15}
          className="absolute pointer-events-none left-[0.138rem] top-[0.145rem] text-space"
        />
      ) : (
        <FaMoon
          className="absolute top-1 left-5 pointer-events-none text-offwhite"
          size={12}
        />
      )}

      <Switch
        className="data-[state=checked]:bg-offwhite data-[state=unchecked]:bg-black border-black border dark:border-none"
        thumbClassName="data-[state=checked]:bg-space data-[state=unchecked]:bg-offwhite"
        checked={darkMode}
        onCheckedChange={() => {
          document.documentElement.dataset.theme = darkMode ? "light" : "dark";
          setDarkMode(!darkMode);
        }}
      />
    </div>
  );
};
