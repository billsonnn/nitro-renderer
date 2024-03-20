import { IMessageDataWrapper, IPetBreedingResultData } from '@nitrots/api';

export class PetBreedingResultData implements IPetBreedingResultData
{
    private _stuffId: number;
    private _classId: number;
    private _productCode: string;
    private _userId: number;
    private _userName: string;
    private _rarityLevel: number;
    private _hasMutation: boolean;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._stuffId = wrapper.readInt();
        this._classId = wrapper.readInt();
        this._productCode = wrapper.readString();
        this._userId = wrapper.readInt();
        this._userName = wrapper.readString();
        this._rarityLevel = wrapper.readInt();
        this._hasMutation = wrapper.readBoolean();
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
