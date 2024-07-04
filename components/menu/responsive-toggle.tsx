import * as Icons from "@/components/icons/icons";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useContext, useState } from "react";
import { GridContext } from "@/context/useGridContext";

export const ResponsiveToggle = () => {
  const { setIsMobile } = useContext(GridContext);
  const [selectedTab, setSelectedTab] = useState("desktop");

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    setIsMobile(value === "mobile");
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Tabs
          onValueChange={handleTabChange}
          defaultValue="desktop"
          className="responsive-step overflow-x-auto rounded-lg"
        >
          <TabsList className="bg-muted-foreground/40 dark:bg-muted">
            <TabsTrigger
              value="mobile"
              aria-label="Mobile Mode"
              aria-controls="mobile-tab-content"
              aria-selected={selectedTab === "mobile"}
            >
              <Icons.Mobile className="size-5 text-white" />
            </TabsTrigger>
            <TabsTrigger
              value="desktop"
              aria-label="Desktop Mode"
              aria-controls="desktop-tab-content"
              aria-selected={selectedTab === "desktop"}
            >
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
