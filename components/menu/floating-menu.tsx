"use client";

import dynamic from "next/dynamic";

import { GitHub } from "@/components/menu/github";
import { Random } from "@/components/menu/random";
import { Separator } from "@/components/ui/separator";
import { Reset } from "./reset";
import { CopyCode } from "./copy-code";
import { ResponsiveToggle } from "./responsive-toggle";
import { Website } from "./web";

const Menu = () => {
  return (
    <div className="pointer-events-none  fixed inset-x-0 bottom-0 z-50 flex justify-center shadow-xl  overflow-hidden px-2 pb-1 duration-200 animate-in slide-in-from-bottom-12 lg:justify-center lg:p-8 lg:pb-4">
      <div className="flex w-full flex-col items-center gap-2">
        <div className="pointer-events-auto mb-2 relative mx-auto flex justify-center flex-shrink-0 items-center gap-2 rounded-lg border border-accent bg-muted-foreground/20 dark:bg-muted p-2 shadow backdrop-blur-sm scrollbar-thin max-lg:overflow-x-auto max-sm:w-full">
          <CopyCode />
          <Reset />
          <Random />
          <div className="md:block hidden">
            <Separator orientation="vertical" />
            <ResponsiveToggle />
          </div>
          <Separator orientation="vertical" />
          <GitHub />
          <Website />
        </div>
      </div>
    </div>
  );
};

export const FloatingMenu = dynamic(() => Promise.resolve(Menu), {
  ssr: false,
});
