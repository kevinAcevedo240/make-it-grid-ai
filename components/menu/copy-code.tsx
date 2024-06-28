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
import { GridContext } from "@/context/useGridContext";



export const CopyCode = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 768 }); // Media query for desktop
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Media query for mobile
  const codeContainerRef = useRef<HTMLPreElement>(null);

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');

  const {
    rows,
    cols,
    layout,
    gap,
    saveToLocalStorage,
    loadFromLocalStorage,
  } = useContext(GridContext)

  const handleOpenModal = () => {
    if (isDesktopOrLaptop) {
      // Open Dialog for desktop
      document.getElementById("desktopDialogTrigger")?.click();
    } else if (isMobile) {
      // Open Drawer for mobile
      document.getElementById("mobileDrawerTrigger")?.click();
    }
  }


  const handleCopyClick = () => {
    const mobileData = loadFromLocalStorage('mobile');
    const desktopData = loadFromLocalStorage('desktop');

    if (mobileData.layout.length === 0 && desktopData.layout.length > 0) {
      setConfirmMessage('The mobile layout is empty. Do you want to replicate the desktop layout to mobile or hide it?');
      setIsConfirmDialogOpen(true);
    } else if (desktopData.layout.length === 0 && mobileData.layout.length > 0) {
      setConfirmMessage('The desktop layout is empty. Do you want to replicate the mobile layout to desktop or hide it?');
      setIsConfirmDialogOpen(true);
    } else {
      handleOpenModal();
    }
  };

  const handleReplicate = () => {
    const mobileData = loadFromLocalStorage('mobile');
    const desktopData = loadFromLocalStorage('desktop');

    if (mobileData.layout.length === 0 && desktopData.layout.length > 0) {
      saveToLocalStorage('mobile', { rows: desktopData.rows, cols: desktopData.cols, gap: desktopData.gap, layout: desktopData.layout });
    } else if (desktopData.layout.length === 0 && mobileData.layout.length > 0) {
      saveToLocalStorage('desktop', { rows: mobileData.rows, cols: mobileData.cols, gap: mobileData.gap, layout: mobileData.layout });
    }

    handleOpenModal();
    setIsConfirmDialogOpen(false);
  };

  const handleHide = () => {
    handleOpenModal();
    setIsConfirmDialogOpen(false);
  };


  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleCopyClick}
            className="copy-step bg-primary active:scale-90"
          >
            <Icons.Copy className="size-5 text-white" />
            <span className="sr-only">Copy Code</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="md:block hidden text-center">
          Copy Code
        </TooltipContent>
      </Tooltip>

      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex flex-col justify-start items-start mb-4">
              <h2 className="text-2xl">Confirm Action</h2>
              <span className="text-sm text-muted-foreground">
                {confirmMessage}
              </span>
              <div className="mt-4">
                <Button className="mr-2" onClick={handleReplicate}>Replicate</Button>
                <Button onClick={handleHide}>Hide</Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {isDesktopOrLaptop && (
        <Dialog>
          <DialogTrigger asChild>
            <Button id="desktopDialogTrigger" className="hidden"></Button>
          </DialogTrigger>
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
            <Button id="mobileDrawerTrigger" className="hidden"></Button>
          </DrawerTrigger>
          <DrawerContent className="md:hidden">
            <DrawerHeader>
              <DrawerTitle>Generated Code</DrawerTitle>
              <DrawerDescription>
                Choose a format to copy the code and/or test it directly in
                CodeSandbox
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
