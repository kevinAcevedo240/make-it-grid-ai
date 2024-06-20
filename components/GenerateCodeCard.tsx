import React, { useState } from 'react';
import { CopyIcon } from "@radix-ui/react-icons";
import { Button } from './ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from './ui/label';
import { generateCssCode, generateHtmlCode, generateTailwindCode } from '@/utils/GenerateTailwindCode';
import toast from 'react-hot-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

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
        if (activeTab === 'jsx') {
            if (codeContainerRef.current) {
                codeToCopy = codeContainerRef.current.innerText.trim();
            }
        } else if (activeTab === 'html') {
            const htmlCode = generateHtmlCode(rows, cols, gap, layout);
            const cssCode = generateCssCode(rows, cols, gap, layout);
            codeToCopy = `<! -- HTML CODE -->\n\n${htmlCode}\n\n<! -- CSS CODE -->\n\n${cssCode}`;
        }

        if (codeToCopy) {
            navigator.clipboard.writeText(codeToCopy)
                .then(() => toast.success('Code Copied to Clipboard!'))
                .catch((err) => console.error('Failed to copy:', err));
        }
    };

    return (
      <Card className="mt-12">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center">
              <h2 className="text-xl sm:text-2xl">Generated Tailwind Code</h2>
              <Button
                onClick={handleCopyToClipboard}
                className="p-2 dark:border dark:border-primary dark:bg-primary/0"
              >
                <CopyIcon className="size-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Tabs defaultValue="jsx" onValueChange={setActiveTab} className="overflow-x-auto">
                <TabsList>
                  <TabsTrigger value="jsx">JSX</TabsTrigger>
                  <TabsTrigger value="html">HTML / CSS</TabsTrigger>
                </TabsList>
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
                      className="border rounded-lg p-2 overflow-x-auto max-h-64 overflow-y-auto"
                    >
                      {generateHtmlCode(rows, cols, gap, layout)}
                    </pre>
                    <pre
                      ref={codeContainerRef}
                      className="border rounded-lg p-2 overflow-x-auto max-h-64 overflow-y-auto"
                    >
                      {generateCssCode(rows, cols, gap, layout)}
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    );
};

export default GeneratedCodeCard;
