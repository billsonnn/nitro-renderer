export class TalentTrackRewardProduct
{
    private _productCode: string;
    private _vipDays: number;

    constructor(name: string, unknownInt: number)
    {
        this._productCode = name;
        this._vipDays = unknownInt;
    }

    public get productCode(): string
    {
        return this._productCode;
    }

    public get vipDays(): number
    {
        return this._vipDays;
    }
}
