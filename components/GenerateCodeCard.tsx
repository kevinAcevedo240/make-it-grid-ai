import React, { useState } from 'react';
import * as Icons from "@/components/icons";
import { Button } from './ui/button';
import { generateCssCode, generateFlexboxCode, generateHtmlCode, generateTailwindCode } from '@/utils/GenerateCode';
import toast from 'react-hot-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { generateSandboxUrl } from '@/lib/createSandbox';
import SandboxFileGenerator from '@/lib/SandboxFileGenerator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GeneratedCodeCardProps {
    rows: number;
    cols: number;
    gap: number;
    layout: { i: string; x: number; y: number; w: number; h: number; }[];
    codeContainerRef: React.RefObject<HTMLPreElement>;
}

const GeneratedCodeCard: React.FC<GeneratedCodeCardProps> = ({ rows, cols, gap, layout, codeContainerRef }) => {
    const [activeTab, setActiveTab] = useState('jsx');

    const handleCopyToClipboard = () => {
      let codeToCopy = '';
  
      switch (activeTab) {
          case 'jsx':
              if (codeContainerRef.current) {
                  codeToCopy = codeContainerRef.current.innerText.trim();
              }
              break;
          case 'html':
              const htmlCode = generateHtmlCode(layout);
              const cssGridCode = generateCssCode(rows, cols, gap, layout);
              codeToCopy = `<! -- HTML CODE -->\n\n${htmlCode}\n\n<! -- GRID CSS CODE -->\n\n${cssGridCode}`;
              break;
          case 'flexbox':
              const flexboxHtmlCode = generateHtmlCode(layout);
              const flexboxCssCode = generateFlexboxCode(rows, cols, gap, layout);
              codeToCopy = `<! -- HTML CODE -->\n\n${flexboxHtmlCode}\n\n<! -- FLEXBOX CSS CODE -->\n\n${flexboxCssCode}`;
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
        const sandboxFiles = SandboxFileGenerator({ rows, cols, gap, layout, activeTab });
        
        const sandboxUrl = await generateSandboxUrl(sandboxFiles);
        window.open(sandboxUrl, '_blank');
    };

    return (
      <div className="grid gap-6 m-4 md:m-0 md:mt-4">
        <div className="grid gap-3">
          <Tabs
            defaultValue="jsx"
            onValueChange={setActiveTab}
            className="overflow-x-auto"
          >
            <div className="flex justify-between">
              <TabsList className="bg-muted-foreground/30 rounded-lg">
                <TabsTrigger value="jsx" className="px-2 text-xs md:text-sm">
                  TAILWIND
                </TabsTrigger>
                <TabsTrigger value="html" className="px-2 text-xs md:text-sm">
                  CSS GRID
                </TabsTrigger>
                <TabsTrigger
                  value="flexbox"
                  className="px-2 text-xs md:text-sm"
                >
                  CSS FLEXBOX
                </TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleOpenInCodeSandbox}
                      className="p-2 dark:border dark:border-primary dark:bg-primary/0 active:scale-90"
                    >
                      <Icons.Codesandbox className="size-4" />
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
                      <Icons.Copy className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="md:block hidden">
                    Copy Code
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            <TabsContent value="jsx">
              <pre
                ref={codeContainerRef}
                className="border rounded-lg p-2 overflow-x-auto max-h-64 overflow-y-auto"
              >
                {generateTailwindCode(rows, cols, gap, layout)}
              </pre>
            </TabsContent>
            <TabsContent value="html">
              <div className="md:grid md:grid-cols-2 md:gap-4 space-y-4 md:space-y-0">
                <pre
                  ref={codeContainerRef}
                  className="border rounded-lg p-2 overflow-x-auto sm:max-h-64 max-h-60 overflow-y-auto"
                >
                  {generateHtmlCode(layout)}
                </pre>
                <pre
                  ref={codeContainerRef}
                  className="border rounded-lg p-2 overflow-x-auto sm:max-h-64 max-h-60 overflow-y-auto"
                >
                  {generateCssCode(rows, cols, gap, layout)}
                </pre>
              </div>
            </TabsContent>
            <TabsContent value="flexbox">
              <div className="md:grid md:grid-cols-2 md:gap-4 space-y-4 md:space-y-0">
                <pre
                  ref={codeContainerRef}
                  className="border rounded-lg p-2 overflow-x-auto sm:max-h-64 max-h-60 overflow-y-auto"
                >
                  {generateHtmlCode(layout)}
                </pre>
                <pre
                  ref={codeContainerRef}
                  className="border rounded-lg p-2 overflow-x-auto sm:max-h-64 max-h-60 overflow-y-auto"
                >
                  {generateFlexboxCode(rows, cols, gap, layout)}
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
};

export default GeneratedCodeCard;
