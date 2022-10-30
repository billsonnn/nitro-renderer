export interface INitroLogger
{
    log(...message: any[]): void;
    error(...message: any[]): void;
    warn(...message: any[]): void;
    description: string | number;
    print: boolean;
}
