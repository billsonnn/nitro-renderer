export class AvatarEffect
{
    private _type: number;
    private _subType: number;
    private _duration: number;
    private _inactiveEffectsInInventory: number;
    private _secondsLeftIfActive: number;
    private _permanent: boolean;

    public get type(): number
    {
        return this._type;
    }

    public set type(k: number)
    {
        this._type = k;
    }

    public get subType(): number
    {
        return this._subType;
    }

    public set subType(k: number)
    {
        this._subType = k;
    }

    public get duration(): number
    {
        return this._duration;
    }

    public set duration(k: number)
    {
        this._duration = k;
    }

    public get inactiveEffectsInInventory(): number
    {
        return this._inactiveEffectsInInventory;
    }

    public set inactiveEffectsInInventory(k: number)
    {
        this._inactiveEffectsInInventory = k;
    }

    public get secondsLeftIfActive(): number
    {
        return this._secondsLeftIfActive;
    }

    public set secondsLeftIfActive(k: number)
    {
        this._secondsLeftIfActive = k;
    }

    public get isPermanent(): boolean
    {
        return this._permanent;
    }

    public set isPermanent(k: boolean)
    {
        this._permanent = k;
    }
}
