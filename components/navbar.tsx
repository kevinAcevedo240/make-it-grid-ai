
import { ModeToggle } from './ui/theme-toggle';

const NavBar = () => {
  return (
    <div className="flex justify-between">
      <h1 className="text-2xl font-bold mb-4">MakeItGrid AI</h1>
      <ModeToggle />
    </div>
  );
};

export default NavBar;
