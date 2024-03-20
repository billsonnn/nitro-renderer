import { Interval } from './Interval';

export class DropBounce extends Interval
{
    private _height: number;
    private _offset: number;

    constructor(target: HTMLElement, duration: number, height: number)
    {
        super(target, duration);

        this._height = height;
    }

    public start(): void
    {
        super.start();

        this._offset = 0;

        this.target.style.top = ((this._offset - this._height) + 'px');
    }

    public update(time: number): void
    {
        super.update(time);

        this.target.style.top = (((this._offset - this._height) + (this.getBounceOffset(time) * this._height)) + 'px');
    }

    protected getBounceOffset(k: number): number
    {
        if(k < 0.364) return (7.5625 * k) * k;

        if(k < 0.727)
        {
            k = (k - 0.545);

            return ((7.5625 * k) * k) + 0.75;
        }

        if(k < 0.909)
        {
            k = (k - 0.9091);

            return ((7.5625 * k) * k) + 0.9375;
        }

        k = (k - 0.955);

        return ((7.5625 * k) * k) + 0.984375;
    }

    public stop(): void
    {
        this.target.style.top = (this._offset + 'px');

        super.stop();
    }
}