export class NitroLogger
{
    public static DEBUG_ENABLED: boolean = false;

    public static log(...messages: any[]): void
    {
        if(!this.DEBUG_ENABLED) return;

        console.log(this.logPrefix(), ...messages);
    }

    public static error(...messages: any[]): void
    {
        if(!this.DEBUG_ENABLED) return;

        console.error(this.logPrefix(), ...messages);
    }

    public static warn(...messages: any[]): void
    {
        if(!this.DEBUG_ENABLED) return;

        console.warn(this.logPrefix(), ...messages);
    }

    private static logPrefix(): string
    {
        return '[Nitro]';
    }
}
