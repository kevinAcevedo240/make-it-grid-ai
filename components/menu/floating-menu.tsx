"use client";

import dynamic from "next/dynamic";

import { GitHub } from "@/components/menu/github";
import { Random } from "@/components/menu/random";
import { Separator } from "@/components/ui/separator";
import { Reset } from "./reset";
import { ResponsiveToggle } from "./responsive-toggle";
import { Website } from "./web";
import CopyCode from "./copy-code";
import BuyMeCoffee from "./buy-me-coffee";
import DownloadAsImage from "./download-as-image";
import Loader from "../loader";
import { GridContext } from "@/context/useGridContext";
import { useContext } from "react";


const Menu = () => {

  const { loading} = useContext(GridContext);

  return (
    <>
      {loading && <Loader />}
      <div className="pointer-events-none   fixed inset-x-0 bottom-0 z-50 flex justify-center shadow-xl  overflow-hidden px-2 pb-1 duration-200 animate-in slide-in-from-bottom-12 md:justify-center md:p-14 md:pb-4">
        <div className="flex w-full flex-col items-center gap-2">
          <div className="pointer-events-auto relative p-2 mx-auto flex flex-shrink-0 items-center gap-2 rounded-md border border-accent bg-white/60 shadow-lg dark:bg-muted/70 backdrop-blur-sm scrollbar-thin max-lg:overflow-x-auto max-sm:w-full">
            <CopyCode />
            <Reset />
            <Random />
            <DownloadAsImage />
            <div>
              <Separator orientation="vertical" />
              <ResponsiveToggle />
            </div>
            <Separator orientation="vertical" />
            <GitHub />
            <Website />
            <BuyMeCoffee />
          </div>
        </div>
      </div>
    </>
  );
};

export const FloatingMenu = dynamic(() => Promise.resolve(Menu), {
  ssr: false,
});
