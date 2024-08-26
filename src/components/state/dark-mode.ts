import { atomWithStorage } from "jotai/utils";

export const darkModeAtom = atomWithStorage(
  "darkMode",
  !!localStorage.getItem("darkMode"),
  undefined,
  {
    getOnInit: true,
  },
);
