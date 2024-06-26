import * as Icons from "@/components/icons";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMediaQuery } from "react-responsive"; 
import { useContext, useRef, useState } from "react";
import GeneratedCodeCard from "../GenerateCodeCard";
import { GridContext } from "@/hooks/useGridContext";

export const CopyCode = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 768 }); // Media query para escritorio
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Media query para móvil
  const codeContainerRef = useRef<HTMLPreElement>(null);

  const {
    rows,
    cols,
    layout,
    gap,
  } = useContext(GridContext)


  return (
    <div>
      {isDesktopOrLaptop && (
        <Dialog>
          <Tooltip>
            <DialogTrigger asChild>
              <TooltipTrigger>
                <Button className="copy-step bg-primary  active:scale-90">
                  <Icons.Copy className="size-5 text-white" />
                  <span className="sr-only">Copy Code</span>
                </Button>
              </TooltipTrigger>
            </DialogTrigger>
            <TooltipContent className="md:block hidden">
              Copy Code
            </TooltipContent>
          </Tooltip>

          <DialogContent className="md:block hidden">
            <DialogHeader>
              <div className="flex flex-col justify-start items-start mb-4">
                <h2 className="text-2xl">Generated Code</h2>
                <span className="text-sm text-muted-foreground">
                  Choose a format to copy the code. You can also test it
                  directly in CodeSandbox by clicking the CodeSandbox button.
                </span>
              </div>
            </DialogHeader>
            <GeneratedCodeCard
              rows={rows}
              cols={cols}
              layout={layout}
              gap={gap}
              codeContainerRef={codeContainerRef}
            />
          </DialogContent>
        </Dialog>
      )}

      {isMobile && (
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="copy-step bg-primary active:scale-90">
              <Icons.Copy className="size-5 text-white" />
              <span className="sr-only">Copy Code</span>
            </Button>
          </DrawerTrigger>

          <DrawerContent className="md:hidden">
            <DrawerHeader>
              <DrawerTitle>Generated Code</DrawerTitle>
              <DrawerDescription>
                Choose a format to copy the code and/or test it directly
                in CodeSandbox 
              </DrawerDescription>
            </DrawerHeader>
            <GeneratedCodeCard
              rows={rows}
              cols={cols}
              layout={layout}
              gap={gap}
              codeContainerRef={codeContainerRef}
            />
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};
