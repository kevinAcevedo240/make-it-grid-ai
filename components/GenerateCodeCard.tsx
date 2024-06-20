import React from 'react';
import { CopyIcon } from "@radix-ui/react-icons";
import { Button } from './ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from './ui/label';
import { generateTailwindCode } from '@/utils/GenerateTailwindCode';
import toast from 'react-hot-toast';

interface GeneratedCodeCardProps {
    rows: number;
    cols: number;
    gap: number;
    layout: { i: string; x: number; y: number; w: number; h: number; }[];
    codeContainerRef: React.RefObject<HTMLPreElement>;
}

const GeneratedCodeCard: React.FC<GeneratedCodeCardProps> = ({ rows, cols, gap, layout, codeContainerRef }) => {
    const handleCopyToClipboard = () => {
        if (codeContainerRef.current) {
            const codeToCopy = codeContainerRef.current.innerText.trim();
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
                        <Label htmlFor="name">JSX Code:</Label>
                        <pre
                            ref={codeContainerRef}
                            className="border rounded-lg p-2 overflow-x-auto"
                        >
                            {generateTailwindCode(rows, cols, gap, layout)}
                        </pre>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default GeneratedCodeCard;
