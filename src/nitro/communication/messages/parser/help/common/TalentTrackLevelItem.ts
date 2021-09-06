export class TalentTrackLevelItem
{
    private _name: string;
    private _unknownInt: number;

    constructor(name: string, unknownInt: number)
    {
        this._name = name;
        this._unknownInt = unknownInt;
    }

    public get name(): string
    {
        return this._name;
    }

    public get unknownInt(): number
    {
        return this._unknownInt;
    }
}
