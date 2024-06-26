interface SandboxFileGeneratorProps {
    code: string;
    cssCode?: string;
    activeTab: string;
}

const sandboxFileGenerator = ({ code, cssCode, activeTab }: SandboxFileGeneratorProps) => {
    const generateTailwindFiles = () => {
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
    ${code}
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
    <title>Grid Layout made with HTML and CSS - MakeItGrid</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    ${code}
</body>
</html>
                `,
            },
            "styles.css": {
                content: cssCode,
            },
        };
    };


    const generateSandboxFiles = () => {
        switch (activeTab) {
            case 'tailwind':
                return generateTailwindFiles();
            case 'cssgrid':
                return generateHtmlFiles();
            default:
                return {};
        }
    };

    return generateSandboxFiles(); // Return the generated files based on the active tab
};

export default sandboxFileGenerator;
