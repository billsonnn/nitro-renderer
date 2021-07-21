export class PetBreedingResultData
{
    private _stuffId: number;
    private _classId: number;
    private _productCode: string;
    private _userId: number;
    private _userName: string;
    private _rarityLevel: number;
    private _hasMutation: boolean;

    constructor(stuffId: number, classId: number, productCode: string, userId: number, userName: string, rarityLevel: number, hasMutation: boolean)
    {
        this._stuffId = stuffId;
        this._classId = classId;
        this._productCode = productCode;
        this._userId = userId;
        this._userName = userName;
        this._rarityLevel = rarityLevel;
        this._hasMutation = hasMutation;
    }

    public get stuffId(): number
    {
        return this._stuffId;
    }

    public get classId(): number
    {
        return this._classId;
    }

    public get productCode(): string
    {
        return this._productCode;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get userName(): string
    {
        return this._userName;
    }

    public get rarityLevel(): number
    {
        return this._rarityLevel;
    }

    public get hasMutation(): boolean
    {
        return this._hasMutation;
    }
}
