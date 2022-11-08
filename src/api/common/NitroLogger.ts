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

    private static logPrefix(): string
    {
        return '[Nitro]';
    }

    public static log(...messages: any[]): void
    {
        console.log(this.logPrefix(), ...messages);
    }

    public static error(...messages: any[]): void
    {
        console.error(this.logPrefix(), ...messages);
    }

    public static warn(...messages: any[]): void
    {
        console.warn(this.logPrefix(), ...messages);
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
