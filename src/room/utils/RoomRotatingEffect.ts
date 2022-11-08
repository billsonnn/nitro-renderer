import { GetTickerTime } from '../../pixi-proxy';

export class RoomRotatingEffect
{
    public static STATE_NOT_INITIALIZED: number = 0;
    public static STATE_START_DELAY: number = 1;
    public static STATE_RUNNING: number = 2;
    public static STATE_OVER: number = 3;

    private static _SafeStr_448: number = 0;
    private static _SafeStr_4512: boolean = false;
    private static _SafeStr_4513: number = 0;
    private static _SafeStr_4514: number = 0;
    private static _SafeStr_4515: number = 20000;
    private static _SafeStr_4516: number = 5000;
    private static _SafeStr_4524: ReturnType<typeof setTimeout>;

    public static init(_arg_1: number, _arg_2: number): void
    {
        this._SafeStr_4513 = 0;
        this._SafeStr_4515 = _arg_1;
        this._SafeStr_4516 = _arg_2;
        this._SafeStr_4514 = GetTickerTime();
        this._SafeStr_448 = 1;
    }

    public static turnVisualizationOn(): void
    {
        if((this._SafeStr_448 === 0) || (this._SafeStr_448 === 3)) return;

        if(!this._SafeStr_4524) this._SafeStr_4524 = setTimeout(() => this.turnVisualizationOff(), this._SafeStr_4516);

        const _local_1 = (GetTickerTime() - this._SafeStr_4514);

        if(_local_1 > (this._SafeStr_4515 + this._SafeStr_4516))
        {
            this._SafeStr_448 = 3;

            return;
        }

        this._SafeStr_4512 = true;

        if(_local_1 < this._SafeStr_4515)
        {
            this._SafeStr_448 = 1;

            return;
        }

        this._SafeStr_448 = 2;
        this._SafeStr_4513 = ((_local_1 - this._SafeStr_4515) / this._SafeStr_4516);
    }

    public static turnVisualizationOff(): void
    {
        this._SafeStr_4512 = false;

        clearTimeout(this._SafeStr_4524);

        this._SafeStr_4524 = null;
    }

    public static isVisualizationOn(): boolean
    {
        return (this._SafeStr_4512 && this.isRunning());
    }

    private static isRunning(): boolean
    {
        if((this._SafeStr_448 === 1) || (this._SafeStr_448 === 2)) return true;

        return false;
    }
}
