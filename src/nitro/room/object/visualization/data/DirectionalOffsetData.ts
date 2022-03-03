export class DirectionalOffsetData
{
    private _offsetX: Map<number, number>;
    private _offsetY: Map<number, number>;

    constructor()
    {
        this._offsetX = new Map();
        this._offsetY = new Map();
    }

    public getXOffset(direction: number, defaultX: number): number
    {
        const existing = this._offsetX.get(direction);

        if(existing === undefined || existing === null) return defaultX;

        return existing;
    }

    public getYOffset(direction: number, defaultY: number): number
    {
        const existing = this._offsetY.get(direction);

        if(existing === undefined || existing === null) return defaultY;

        return existing;
    }

    public setDirection(direction: number, offsetX: number, offsetY: number): void
    {
        this._offsetX.set(direction, offsetX);
        this._offsetY.set(direction, offsetY);
    }
}