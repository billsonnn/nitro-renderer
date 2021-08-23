import { IMessageDataWrapper, IMessageParser } from '../../../../../../core';

export class NestBreedingSuccessParser implements IMessageParser
{
    private _rarityCategory: number;
    private _petId: number;

    public flush(): boolean
    {
        this._petId = -1;
        this._rarityCategory = -1;

        return true;
    }

    public parse(k: IMessageDataWrapper): boolean
    {
        this._petId = k.readInt();
        this._rarityCategory = k.readInt();

        return true;
    }

    public get rarityCategory(): number
    {
        return this._rarityCategory;
    }

    public get petId(): number
    {
        return this._petId;
    }
}
