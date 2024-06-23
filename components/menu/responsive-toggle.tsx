
import * as Icons from "@/components/icons";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
import { Tabs,  TabsList, TabsTrigger } from '@/components/ui/tabs';

export const ResponsiveToggle = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Tabs defaultValue="mobile" className="responsive-step overflow-x-auto rounded-lg">
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
      <TooltipContent  className="md:block hidden">Make your grid responsive</TooltipContent>
    </Tooltip>
  );
};
