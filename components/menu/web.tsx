import * as Icons from "@/components/icons/icons";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Website = () => {
  const handleClick = () => {
    window.open("https://www.cliclab.studio/", "_blank");
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          className="website-step border-primary border dark:bg-primary/0 active:scale-90"
          onClick={handleClick}
        >
          <Icons.Globe className="size-5" />
          <span className="sr-only">Website</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="md:block hidden">
       Interested in a website?
      </TooltipContent>
    </Tooltip>
  );
};
