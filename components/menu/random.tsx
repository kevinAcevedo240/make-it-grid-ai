import * as Icons from "@/components/icons/icons";
import { Button } from "../ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { GridContext } from "@/context/useGridContext";
import { useContext } from "react";

export const Random = () => {
    const { randomizeGrid} = useContext(GridContext);


    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
          aria-label="Randomize Grid"
          onClick={randomizeGrid}
            className="random-step dark:border-primary gap-3 dark:border bg-muted-foreground dark:bg-primary/0 active:scale-90"
          >
            <Icons.Dices className="size-5 text-white" />
            <span className="hidden md:block text-white">Randomize</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="md:block hidden">
          Generate Random Grid
        </TooltipContent>
      </Tooltip>
    );
};
