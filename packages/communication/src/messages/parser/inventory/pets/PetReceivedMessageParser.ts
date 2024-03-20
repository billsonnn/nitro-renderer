import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { PetData } from './PetData';

export class PetReceivedMessageParser implements IMessageParser
{
    private _boughtAsGift: boolean;
    private _pet: PetData;

    public flush(): boolean
    {
        this._boughtAsGift = false;
        this._pet = null;

        return true;
    }

    public parse(k: IMessageDataWrapper): boolean
    {
        this._boughtAsGift = k.readBoolean();
        this._pet = new PetData(k);

        return true;
    }

    public get boughtAsGift(): boolean
    {
        return this._boughtAsGift;
    }

    public get pet(): PetData
    {
        return this._pet;
    }
}
