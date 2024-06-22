import Link from "next/link";

import * as Icons from "@/components/icons";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Website = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button className="border-primary border dark:bg-primary/0 active:scale-90">
          <Link href="https://www.kevin-acevedo.dev/" target="_blank">
            <Icons.Globe className="size-5" />
            <span className="sr-only">Website</span>
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent  className="md:block hidden">Visit my Website</TooltipContent>
    </Tooltip>
  );
};
