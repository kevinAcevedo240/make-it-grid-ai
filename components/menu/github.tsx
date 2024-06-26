import Link from "next/link";

import * as Icons from "@/components/icons";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const GitHub = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button className="github-step dark:border-primary bg-muted-foreground dark:border dark:bg-transparent active:scale-90">
          <Link href="https://github.com/kevinAcevedo240/make-it-grid-ai" target="_blank">
            <Icons.GitHub className="size-5 text-white" />
            <span className="sr-only">GitHub</span>
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent  className="md:block hidden">It&apos;s Open Source!</TooltipContent>
    </Tooltip>
  );
};
