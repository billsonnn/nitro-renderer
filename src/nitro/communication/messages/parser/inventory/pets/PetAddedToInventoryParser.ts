import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';
import { PetData } from './PetData';

export class PetAddedToInventoryParser implements IMessageParser
{
    private _pet: PetData;
    private _boughtAsGift: boolean;

    public flush(): boolean
    {
        this._pet = null;
        this._boughtAsGift = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._pet = new PetData(wrapper);
        this._boughtAsGift = wrapper.readBoolean();

        return true;
    }

    public get pet(): PetData
    {
        return this._pet;
    }

    public get boughtAsGift(): boolean
    {
        return this._boughtAsGift;
    }
}
