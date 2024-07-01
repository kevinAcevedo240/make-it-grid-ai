import React, { useState } from 'react';
import * as Icons from "@/components/icons";
import { Button } from './ui/button';
import toast from 'react-hot-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { generateSandboxUrl } from '@/lib/createSandbox';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useGridCodeGenerator from '@/hooks/useGridCodeGenerator';
import sandboxFileGenerator from '@/lib/SandboxFileGenerator';

interface GeneratedCodeCardProps {
    codeContainerRef: React.RefObject<HTMLPreElement>;
}

const GeneratedCodeCard: React.FC<GeneratedCodeCardProps> = ({codeContainerRef }) => {
    const [activeTab, setActiveTab] = useState('tailwind');
    const {htmlCode, tailwindCode, cssCode} = useGridCodeGenerator();

    const handleCopyToClipboard = () => {
      let codeToCopy = '';
  
      switch (activeTab) {
          case 'tailwind':
              if (codeContainerRef.current) {
                  codeToCopy = codeContainerRef.current.innerText.trim();
              }
              break;
          case 'cssgrid':
              codeToCopy = `<!-- HTML CODE -->\n\n${htmlCode}\n\n<!-- GRID CSS CODE -->\n\n${cssCode}`;
              break;
          default:
              console.error('Invalid tab selected');
              return;
      }
  
      if (codeToCopy) {
          navigator.clipboard.writeText(codeToCopy)
              .then(() => toast.success('Code Copied to Clipboard!'))
              .catch((err) => console.error('Failed to copy:', err));
      }
  };
  

  const handleOpenInCodeSandbox = async () => {
    let code = '';
    let css = '';

    switch (activeTab) {
        case 'tailwind':
            code = tailwindCode;
            break;
        case 'cssgrid':
            code = htmlCode;
            css = cssCode;
            break;
        default:
            break;
    }

    const sandboxFiles = sandboxFileGenerator({ code, cssCode: css, activeTab });

    const sandboxUrl = await generateSandboxUrl(sandboxFiles);
    window.open(sandboxUrl, '_blank');
};

    return (
      <div className="grid gap-6 m-4 md:m-0 md:mt-4">
        <div className="grid gap-3">
          <Tabs
            defaultValue="tailwind"
            onValueChange={setActiveTab}
            className="overflow-x-auto"
          >
            <div className="flex justify-between">
              <TabsList className="bg-muted-foreground/30 rounded-lg">
                <TabsTrigger value="tailwind" className="px-2 text-sm">
                  TAILWIND
                </TabsTrigger>
                <TabsTrigger value="cssgrid" className="px-2 text-sm">
                  CSS GRID
                </TabsTrigger>
              </TabsList>
              <div className="flex gap-2 sm:gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleOpenInCodeSandbox}
                      className="p-2 dark:border dark:border-primary dark:bg-primary/0 active:scale-90"
                    >
                      <Icons.Codesandbox className="size-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="md:block hidden">
                    Open Code in CodeSandbox
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleCopyToClipboard}
                      className="p-2 dark:border dark:border-primary dark:bg-primary/0 active:scale-90"
                    >
                      <Icons.Copy className="size-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="md:block hidden">
                    Copy Code
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            <TabsContent value="tailwind">
              <pre 
                ref={codeContainerRef}
                className="border rounded-lg p-2 overflow-x-auto max-h-72 overflow-y-auto"
              >
                {tailwindCode}
              </pre>
            </TabsContent>
            <TabsContent value="cssgrid">
              <div className="md:grid md:grid-cols-2 md:gap-4 space-y-4 md:space-y-0">
                <pre
                  className="border rounded-lg p-2 overflow-x-auto sm:max-h-72 max-h-60 overflow-y-auto"
                >
                  {htmlCode}
                </pre>
                <pre
                  className="border rounded-lg p-2 overflow-x-auto sm:max-h-72 max-h-60 overflow-y-auto"
                >
                  {cssCode}
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
};

export default GeneratedCodeCard;
