import { IMessageDataWrapper, IMessageParser } from '../../../../../../../api';

export class FurnitureFloorRemoveParser implements IMessageParser
{
    private _itemId: number;
    private _isExpired: boolean;
    private _userId: number;
    private _delay: number;

    public flush(): boolean
    {
        this._itemId = 0;
        this._isExpired = true;
        this._userId = 0;
        this._delay = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._itemId = parseInt(wrapper.readString());
        this._isExpired = wrapper.readBoolean();
        this._userId = wrapper.readInt();
        this._delay = wrapper.readInt();

        return true;
    }

    public get itemId(): number
    {
        return this._itemId;
    }

    public get isExpired(): boolean
    {
        return this._isExpired;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get delay(): number
    {
        return this._delay;
    }
}
