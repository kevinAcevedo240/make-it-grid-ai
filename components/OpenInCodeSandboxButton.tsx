import React from 'react';
import * as Icons from "@/components/icons";
import { createSandbox } from 'codesandbox-import-utils/lib/create-sandbox';
import { Button } from './ui/button';

interface OpenInCodeSandboxButtonProps {
    activeTab: string;
    rows: number;
    cols: number;
    gap: number;
    layout: { i: string; x: number; y: number; w: number; h: number; }[];
}

const OpenInCodeSandboxButton: React.FC<OpenInCodeSandboxButtonProps> = ({ activeTab, rows, cols, gap, layout }) => {
    const generateFiles = () => {
        if (activeTab === 'jsx') {
            return {
                files: {
                    'public/index.html': {
                        content: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React + Tailwind</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
                        `
                    },
                    'src/index.js': {
                        content: `
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
                        `
                    },
                    'src/App.js': {
                        content: `
import React from 'react';

const App = () => {
  return (
    <div className="grid grid-cols-${cols} grid-rows-${rows} gap-${gap}">
      ${layout.map(item => `<div className="col-start-${item.x + 1} row-start-${item.y + 1} col-span-${item.w} row-span-${item.h}">${item.i}</div>`).join('\n')}
    </div>
  );
};

export default App;
                        `
                    },
                    'src/index.css': {
                        content: `
@tailwind base;
@tailwind components;
@tailwind utilities;
                        `
                    },
                    'tailwind.config.js': {
                        content: `
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
                        `
                    },
                    'postcss.config.js': {
                        content: `
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
                        `
                    },
                    'package.json': {
                        content: {
                            dependencies: {
                                "react": "latest",
                                "react-dom": "latest",
                                "tailwindcss": "^2.2.19",
                                "postcss": "^8.3.11",
                                "autoprefixer": "^10.3.7"
                            },
                            scripts: {
                                start: "react-scripts start",
                                build: "react-scripts build",
                                test: "react-scripts test",
                                eject: "react-scripts eject"
                            }
                        }
                    }
                }
            };
        } else if (activeTab === 'html') {
            return {
                files: {
                    'index.html': {
                        content: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Grid</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="grid-container">
    ${layout.map(item => `<div class="item-${item.i}">${item.i}</div>`).join('\n')}
  </div>
</body>
</html>
                        `
                    },
                    'styles.css': {
                        content: `
.grid-container {
  display: grid;
  grid-template-columns: repeat(${cols}, 1fr);
  grid-template-rows: repeat(${rows}, 100px);
  gap: ${gap * 4}px;
}

${layout.map(item => `.item-${item.i} {
  grid-column-start: ${item.x + 1};
  grid-column-end: span ${item.w};
  grid-row-start: ${item.y + 1};
  grid-row-end: span ${item.h};
}`).join('\n')}
                        `
                    }
                }
            };
        } else if (activeTab === 'flexbox') {
            return {
                files: {
                    'index.html': {
                        content: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Flexbox</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="flex-container">
    ${layout.map(item => `<div class="item-${item.i}">${item.i}</div>`).join('\n')}
  </div>
</body>
</html>
                        `
                    },
                    'styles.css': {
                        content: `
.flex-container {
  display: flex;
  flex-wrap: wrap;
}

${layout.map(item => `.item-${item.i} {
  flex: 0 0 calc(${item.w / cols * 100}% - ${gap * 4}px);
  height: ${item.h * 100}px;
  margin: ${gap * 4 / 2}px;
}`).join('\n')}
                        `
                    }
                }
            };
        }
    };

    const handleOpenInCodeSandbox = async () => {
        const sandboxFiles = generateFiles();
        const sandboxUrl = await createSandbox(sandboxFiles);
        window.open(sandboxUrl, '_blank');
    };

    return (
        <Button onClick={handleOpenInCodeSandbox} className="p-2 dark:border dark:border-primary dark:bg-primary/0 active:scale-90">
            <Icons.Codesandbox className="size-4" />
        </Button>
    );
};

export default OpenInCodeSandboxButton;
