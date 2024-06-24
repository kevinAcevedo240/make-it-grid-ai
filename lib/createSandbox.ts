import { getParameters } from 'codesandbox/lib/api/define';

export const generateSandboxUrl = async (files: any) => {
    const parameters = getParameters({ files });
    return `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`;
};
