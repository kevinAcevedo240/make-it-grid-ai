import React from 'react';
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import BuyMeCoffeBrand from '../icons/buymecoffeBrand';
import Image from 'next/image';


const BuyMeCoffee: React.FC = () => {
    const handleClick = () => {
        window.open("https://buymeacoffee.com/kevinacevedo", "_blank");
      };

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleClick}
            className="buymecoffee-step gap-2 border-primary border dark:bg-primary/0 active:scale-90"
          >
            <BuyMeCoffeBrand className='size-5'/>
            <Image className="hidden md:block text-white" src="/buymecoffee.png" alt="Buy me a coffee" width={110} height={110} />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="md:block hidden text-center">
          Love this project? <br /> Show your support by buying me a coffee! ☕️
        </TooltipContent>
      </Tooltip>
    );
};

export default BuyMeCoffee;