import { INitroLogger } from './INitroLogger';

export class NitroLogger implements INitroLogger
{
    private static LAST_TIMESTAMP: number = Date.now();

    private _name: string;
    private _description: string | number;
    private _print: boolean;

    constructor(name: string, description: string | number = null)
    {
        this._name = name;
        this._description = description;
        this._print = true;
    }

    public log(message: string): void
    {
        this.printMessage(message, 'log');
    }

    public error(message: string, trace?: string): void
    {
        this.printMessage(trace || message, 'error');
    }

    public warn(message: string): void
    {
        this.printMessage(message, 'warn');
    }

    public printMessage(message: string, modus: string): void
    {
        if(!this._print) return;

        NitroLogger.log(message, this._name, modus);
    }

    public static log(message: string, name: string = 'Nitro', modus: string = null): void
    {
        const logString = `[Nitro] [${ name }] ${ message } ${ this.getTimestamp() }`;

        switch(modus)
        {
            case 'error':
                console.error(logString);
                break;
            case 'warn':
                console.warn(logString);
                break;
            case 'log':
            default:
                console.log(logString);
                break;
        }
    }

    public static getTimestamp(): string
    {
        const now = Date.now();

        const result = ` +${ now - NitroLogger.LAST_TIMESTAMP || 0 }ms`;

        this.LAST_TIMESTAMP = now;

        return result;
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
