export class TalentTrackRewardProduct
{
    private _productCode: string;
    private _vipDays: number;

    constructor(name: string, vipDays: number)
    {
        this._productCode = name;
        this._vipDays = vipDays;
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
