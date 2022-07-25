import { INitroLogger } from './INitroLogger';

export class NitroLogger implements INitroLogger
{
    private _name: string;
    private _description: string | number;
    private _print: boolean;

    constructor(name: string, description: string | number = null)
    {
        this._name = name;
        this._description = description;
        this._print = true;
    }

    public log(...message: any[]): void
    {
        this.printMessage('log', ...message);
    }

    public error(...message: any[]): void
    {
        this.printMessage('error', ...message);
    }

    public warn(...message: any[]): void
    {
        this.printMessage('warn', ...message);
    }

    public printMessage(modus: string, ...message: any[]): void
    {
        if(!this._print) return;

        NitroLogger.log(this._name, modus, ...message);
    }

    public static log(name: string = 'Nitro', modus: string = null, ...message: any[]): void
    {
        const logPrefix = `[Nitro] [${name}]`;

        switch(modus)
        {
            case 'error':
                console.error(logPrefix, ...message);
                break;
            case 'warn':
                console.warn(logPrefix, ...message);
                break;
            case 'log':
            default:
                console.log(logPrefix, ...message);
                break;
        }
    }

    public static error(name: string = 'Nitro', ...message: any[]): void
    {
        return this.log(name, 'error', ...message);
    }

    public static warn(name: string = 'Nitro', ...message: any[]): void
    {
        return this.log(name, 'warn', ...message);
    }

    public get description(): string | number
    {
        return this._description;
    }

    public set description(description: string | number)
    {
        this._description = description;
    }

    public get print(): boolean
    {
        return this._print;
    }

    public set print(flag: boolean)
    {
        this._print = flag;
    }
}
