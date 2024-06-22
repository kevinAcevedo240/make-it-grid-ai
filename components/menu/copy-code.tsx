import * as Icons from "@/components/icons";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { useMediaQuery } from "react-responsive"; // Importar react-responsive para manejar media queries
import { useContext, useRef, useState } from "react";
import useGridItems from "@/hooks/useGridItems";
import GeneratedCodeCard from "../GenerateCodeCard";
import { GridContext } from "@/hooks/useGridContext";

export const CopyCode = () => {
  const [showDialog, setShowDialog] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 768 }); // Media query para escritorio
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Media query para móvil
  const codeContainerRef = useRef<HTMLPreElement>(null);

  const {
    rows,
    cols,
    layout,
    gap,
  } = useContext(GridContext)

  const openDialog = () => {
    setShowDialog(true);
  };

  const openDrawer = () => {
    // Lógica para abrir drawer en móvil (implementación no proporcionada)
    console.log("Abrir drawer en móvil");
  };

  const handleButtonClick = () => {
    if (isDesktopOrLaptop) {
      openDialog(); // Abrir diálogo en pantalla grande
    } else if (isMobile) {
      openDrawer(); // Abrir drawer en móvil
    }
  };


  

  return (
    <div>
      {isDesktopOrLaptop && (
        <Dialog>
          <Tooltip>
            <DialogTrigger asChild>
              <TooltipTrigger>
              <Button
                className="bg-primary  active:scale-90"
                onClick={handleButtonClick}
              >
                <Icons.Copy className="size-5 text-white" />
                <span className="sr-only">Copy Code</span>
              </Button>
              </TooltipTrigger>
            </DialogTrigger>
            <TooltipContent className="md:block hidden">Copy Code</TooltipContent>
          </Tooltip>

          <DialogContent className="md:block hidden">
            <DialogHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl">Generated Code</h2>
              
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
            <Button
              className="bg-primary active:scale-90"
              onClick={handleButtonClick}
            >
              <Icons.Copy className="size-5 text-white" />
              <span className="sr-only">Copy Code</span>
            </Button>
          </DrawerTrigger>

          <DrawerContent className="md:hidden">
            <DrawerHeader>
              <DrawerTitle>Generated Code</DrawerTitle>
              <DrawerDescription>Copy the code below</DrawerDescription>
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
