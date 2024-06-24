import { generateTailwindCode, generateHtmlCode, generateCssCode, generateFlexboxCode, generateHtmlFlexboxCode } from '@/utils/GenerateCode';

interface SandboxFileGeneratorProps {
    rows: number;
    cols: number;
    gap: number;
    layout: { i: string; x: number; y: number; w: number; h: number; }[];
    activeTab: string;
}

const sandboxFileGenerator = ({ rows, cols, gap, layout, activeTab }: SandboxFileGeneratorProps) => {
    const generateJsxFiles = () => {
        return {
          "index.html": {
            content: `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Grid Layout made with tailwind - MakeItGrid</title>
    <link
      href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    ${generateTailwindCode(rows, cols, gap, layout)} 
  </body>
</html>
                `,
          }
          
        };
    };

    const generateHtmlFiles = () => {
        return {
          "index.html": {
            content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <title>MakeItGrid</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    ${generateHtmlCode(layout)}
</body>
</html>
                `,
          },
          "styles.css": {
            content: generateCssCode(rows, cols, gap, layout),
          },
        };
    };

    const generateFlexboxFiles = () => {
        return {
            'index.html': {
                content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <title>MakeItGrid</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    ${generateHtmlFlexboxCode(layout)}
</body>
</html>
                `,
            },
            'styles.css': {
                content: generateFlexboxCode(rows, cols, gap, layout),
            },
        };
    };

    const generateSandboxFiles = () => {
        switch (activeTab) {
            case 'jsx':
                return generateJsxFiles();
            case 'html':
                return generateHtmlFiles();
            case 'flexbox':
                return generateFlexboxFiles();
            default:
                return {};
        }
    };

    return generateSandboxFiles(); // Return the generate files based on the active tab
};

export default sandboxFileGenerator;
