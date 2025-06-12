import { readFile, writeFile } from "fs/promises"
import { ZodError } from "zod"

export const formatDate = (date: Date) => date.toISOString().split('T')[0]
const separator = (char = '-') => char.repeat(80);
const timestamp = () => new Date().toISOString();

export const createLog = async (error: Error | ZodError) => {
    const today = formatDate(new Date())
    let prevLog = ''
    try {
        prevLog = await readFile(`./logs/${today}.txt`, { encoding: 'utf-8' })
    } catch { }

    prevLog += error instanceof ZodError ? createZodLogData(error) : createLogData(error);

    await writeFile(`./logs/${today}.txt`, prevLog)
}


export const createZodLogData = (error: ZodError, label = 'Zod Validation Error'): string => {
    const issues = error.issues.map((issue, i) => {
        const path = issue.path.length > 0 ? issue.path.join('.') : '[root]';
        return `  ${i + 1}. ${path}: ${issue.message}`;
    }).join('\n');

    return [
        separator(),
        `Timestamp: ${timestamp()}`,
        `${label} (${error.issues.length} issue${error.issues.length !== 1 ? 's' : ''}):`,
        issues,
        separator(),
        '', // <-- Blank line between entries
    ].join('\n');
};

export const createLogData = (error: Error): string => {
    return [
        separator,
        `Timestamp: ${timestamp()}`,
        `Name:    ${error.name}`,
        `Message: ${error.message}`,
        `Cause:   ${error.cause ?? 'N/A'}`,
        `Stack:\n${error.stack ?? 'No stack trace available'}`,
        separator,
    ].join('\n');
};
