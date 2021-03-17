import { Motion } from './Motion';

export class Callback extends Motion
{
    protected _callback: Function;

    constructor(k: Function)
    {
        super(null);

        this._callback = k;
    }

    public get running(): boolean
    {
        return (this._running && !!this._callback);
    }

    public tick(k: number): void
    {
        super.tick(k);

        if(this._callback)
        {
            this._callback();

            this._callback = null;
        }
    }
}