
'use client'

import GuideButton from './Guide-Button';
import { ModeToggle } from './ui/theme-toggle';

const NavBar = () => {
  return (
    <div className="flex justify-between">
      <h1 className="flex items-center sm:text-4xl text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-900 dark:from-neutral-200 dark:to-neutral-500 ">
        MakeItGrid <span className='hidden md:block text-3xl ml-2'>| Bento Grid Generator</span>
      </h1>
      <div className="flex justify-center items-center gap-3">
        <GuideButton />
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavBar;
