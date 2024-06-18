import GridEditor from "@/components/GridEditor";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Make It Grid AI</h1>
        <ModeToggle />
      </div>
      <GridEditor />
      <Toaster />
    </div>
  );
}
