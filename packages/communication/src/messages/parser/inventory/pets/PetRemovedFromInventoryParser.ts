import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class PetRemovedFromInventoryParser implements IMessageParser
{
    private _petId: number;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._petId = wrapper.readInt();

        return true;
    }

    public get petId(): number
    {
        return this._petId;
    }
}
