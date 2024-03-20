import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class FurnitureWallRemoveParser implements IMessageParser
{
    private _itemId: number;
    private _userId: number;

    public flush(): boolean
    {
        this._itemId = 0;
        this._userId = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._itemId = parseInt(wrapper.readString());
        this._userId = wrapper.readInt();

        return true;
    }

    public get itemId(): number
    {
        return this._itemId;
    }

    public get userId(): number
    {
        return this._userId;
    }
}
