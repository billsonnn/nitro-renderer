import { Interval } from './Interval';

export class Ease extends Interval
{
    protected _interval: Interval;

    constructor(k: Interval)
    {
        super(k.target, k.duration);

        this._interval = k;
    }

    public start(): void
    {
        super.start();

        this._interval.start();
    }

    public update(k: number): void
    {
        super.update(k);

        this._interval.update(k);
    }

    public stop(): void
    {
        super.stop();

        this._interval.stop();
    }
}