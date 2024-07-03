import React, { useContext, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import GeneratedCodeCard from './GenerateCodeCard';
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
import { Button } from './ui/button';

const GeneratedCodeModal: React.FC = () => {
  const codeContainerRef = useRef<HTMLPreElement>(null);

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 768 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      {isDesktopOrLaptop && (
        <Dialog>
          <DialogTrigger asChild>
            <Button id="desktopDialogTrigger" className="hidden"></Button>
          </DialogTrigger>
          <DialogContent className="md:block hidden max-w-[70rem]">
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
              codeContainerRef={codeContainerRef}
            />
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default GeneratedCodeModal;
