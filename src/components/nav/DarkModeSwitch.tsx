import { Switch } from "~/components/ui/switch";
import { darkModeAtom } from "~/components/state/dark-mode";
import { useAtom } from "jotai";
import { useMemo } from "react";

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
    <Switch
      className="data-[state=checked]:bg-offwhite data-[state=unchecked]:bg-offwhite"
      thumbClassName="data-[state=checked]:bg-pink-300 data-[state=unchecked]:bg-pink-300"
      checked={darkMode}
      onCheckedChange={() => {
        document.documentElement.dataset.theme = darkMode ? "light" : "dark";
        setDarkMode(!darkMode);
      }}
    />
  );
};
