import { atomWithStorage } from "jotai/utils";

export const projectCycleAtom = atomWithStorage(
  "projectCycle",
  localStorage.getItem("projectCycle"),
  undefined,
  {
    getOnInit: true,
  },
);
