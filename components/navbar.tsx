
'use client'

import GuideButton from './Guide-Button';
import { ModeToggle } from './ui/theme-toggle';

const NavBar = () => {
  return (
    <div className="flex justify-between">
      <h1 className="sm:text-4xl text-3xl font-bold">MakeItGrid</h1>
      <div className='flex justify-center items-center gap-3'>
        <GuideButton />
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavBar;
