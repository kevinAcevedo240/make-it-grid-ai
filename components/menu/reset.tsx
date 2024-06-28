
import * as Icons from "@/components/icons";
import { Button } from "../ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
import { GridContext } from "@/context/useGridContext";
import { useContext } from "react";

export const Reset = () => {

  const { ResetGrid} = useContext(GridContext);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={ResetGrid}
          className="reset-step group dark:border-primary dark:border gap-1 bg-muted-foreground dark:bg-primary/0 active:scale-90 transition-transform duration-300"
        >
          <Icons.Reset className="size-5 text-white transition-transform duration-300 group-hover:rotate-35" />
          <span className="sr-only">Reset Layout</span>
          <span className="text-white hidden md:block">Reset</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="md:block hidden">
        Reset Grid Layout
      </TooltipContent>
    </Tooltip>
  );
};
