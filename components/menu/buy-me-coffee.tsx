import React from 'react';
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import BuyMeCoffeBrand from '../icons/buymecoffeBrand';

const BuyMeCoffee: React.FC = () => {
    const handleClick = () => {
        window.open("https://buymeacoffee.com/kevinacevedo", "_blank");
      };

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleClick}
            className="buymecoffee-step border-primary border dark:bg-primary/0 active:scale-90"
          >
            <BuyMeCoffeBrand className='size-5'/>
            <span className="sr-only">Buy Me a Coffee</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="md:block hidden text-center">
          Love this project? <br /> Show your support by buying me a coffee! ☕️
        </TooltipContent>
      </Tooltip>
    );
};

export default BuyMeCoffee;