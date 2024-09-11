import { DarkModeSwitch } from "~/components/nav/DarkModeSwitch";

export const Navbar = () => {
  return (
    <div className="flex sticky justify-between items-center h-20 text-gray-100 bg-blue-800 dark:bg-transparent dark:shadow-md dark:shadow-black dark:text-offwhite">
      <img
        // src="https://assets-global.website-files.com/62d7c8cb6f11a35f47072653/650a327aee4574b4afe11724_Develop%20for%20Good%20Logo-p-500.png"
        src="/logo.svg"
        alt="develop for good engineering"
        className="h-3/5 cursor-pointer ml-[1.5rem]"
        onClick={() => {}}
      />
      <div className="flex gap-4 items-center pr-6">
        <DarkModeSwitch />
      </div>
    </div>
  );
};
