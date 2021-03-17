export interface INitroLogger
{
    log(message: string): void;
    error(message: string, trace?: string): void;
    warn(message: string): void;
    description: string | number;
    print: boolean;
}