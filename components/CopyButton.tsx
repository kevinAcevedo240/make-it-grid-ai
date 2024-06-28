import * as Icons from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import React from "react";

interface CopyButtonProps {
  onClick: () => void;
}

const CopyButton: React.FC<CopyButtonProps> = ({ onClick }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={onClick}
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
  );
};

export default CopyButton;
