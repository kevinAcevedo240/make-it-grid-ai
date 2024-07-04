import * as Icons from "@/components/icons/icons";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const GitHub = () => {
  const handleClick = () => {
    window.open("https://github.com/kevinAcevedo240/make-it-grid-ai", "_blank");
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleClick}
          className="github-step dark:border-primary bg-muted-foreground dark:border dark:bg-transparent active:scale-90"
        >
          <Icons.GitHub className="size-5 text-white" />
          <span className="sr-only">GitHub</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="md:block hidden text-center">
        It&apos;s Open Source! <br /> If you like it, consider giving it a star!
        🌟
      </TooltipContent>
    </Tooltip>
  );
};
