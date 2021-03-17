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

    public get _Str_3882(): number
    {
        return this._subType;
    }

    public set _Str_3882(k: number)
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

    public get _Str_18572(): number
    {
        return this._inactiveEffectsInInventory;
    }

    public set _Str_18572(k: number)
    {
        this._inactiveEffectsInInventory = k;
    }

    public get _Str_12185(): number
    {
        return this._secondsLeftIfActive;
    }

    public set _Str_12185(k: number)
    {
        this._secondsLeftIfActive = k;
    }

    public get _Str_4010(): boolean
    {
        return this._permanent;
    }

    public set _Str_4010(k: boolean)
    {
        this._permanent = k;
    }
}
