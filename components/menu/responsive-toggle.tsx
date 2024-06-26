


import * as Icons from "@/components/icons";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
import { Tabs,  TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useContext } from "react";
import { GridContext } from "@/hooks/useGridContext";

export const ResponsiveToggle = () => {

  const { setIsMobile} = useContext(GridContext);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Tabs
        onValueChange={(value) => setIsMobile(value === "mobile")}
          defaultValue="desktop"
          className="responsive-step overflow-x-auto rounded-lg"
        >
          <TabsList className="bg-muted-foreground/40 dark:bg-muted">
            <TabsTrigger value="mobile">
              <Icons.Mobile className="size-5 text-white" />
            </TabsTrigger>
            <TabsTrigger value="desktop">
              <Icons.Desktop className="size-5 text-white" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </TooltipTrigger>
      <TooltipContent className="md:block hidden">
        Make your grid responsive
      </TooltipContent>
    </Tooltip>
  );
};
