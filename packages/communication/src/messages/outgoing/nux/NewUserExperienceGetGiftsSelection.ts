export class NewUserExperienceGetGiftsSelection
{
    private _dayIndex: number;
    private _stepIndex: number;
    private _giftIndex: number;

    constructor(dayIndex: number, stepIndex: number, giftIndex: number)
    {
        this._dayIndex = dayIndex;
        this._stepIndex = stepIndex;
        this._giftIndex = giftIndex;
    }

    public get dayIndex(): number
    {
        return this._dayIndex;
    }

    public get stepIndex(): number
    {
        return this._stepIndex;
    }

    public get giftIndex(): number
    {
        return this._giftIndex;
    }
}
