export class NitroLogger
{
    public static LOG_DEBUG: boolean = false;
    public static LOG_WARN: boolean = false;
    public static LOG_ERROR: boolean = false;
    public static LOG_EVENTS: boolean = false;
    public static LOG_PACKETS: boolean = false;

    public static log(...messages: any[]): void
    {
        if(!this.LOG_DEBUG) return;

        console.log(this.logPrefix(), ...messages);
    }

    public static warn(...messages: any[]): void
    {
        if(!this.LOG_WARN) return;

        console.warn(this.logPrefix(), ...messages);
    }

    public static error(...messages: any[]): void
    {
        if(!this.LOG_ERROR) return;

        console.error(this.logPrefix(), ...messages);
    }

    public static events(...messages: any[]): void
    {
        if(!this.LOG_EVENTS) return;

        console.log(this.logPrefix(), ...messages);
    }

    public static packets(...messages: any[]): void
    {
        if(!this.LOG_PACKETS) return;

        console.log(this.logPrefix(), ...messages);
    }

    private static logPrefix(): string
    {
        return '[Nitro]';
    }
}
