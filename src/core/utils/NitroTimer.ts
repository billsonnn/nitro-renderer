export class NitroTimer
{
    private _elapsedTime: number;
    private _percision: number;
    private _timer: any;

    constructor(percision: number = 1)
    {
        this._elapsedTime = 0;
        this._percision = percision;
        this._timer = null;

        this.start();
    }

    public start(): void
    {
        this._elapsedTime = 0;

        if(!this._timer)
        {
            this._timer = setInterval(() => this.increase(), this._percision);
        }
    }

    public stop(): void
    {
        if(this._timer)
        {
            clearTimeout(this._timer);
        }
    }

    private increase(): void
    {
        this._elapsedTime += this._percision;
    }

    public getTimer(): number
    {
        return this._elapsedTime;
    }
}