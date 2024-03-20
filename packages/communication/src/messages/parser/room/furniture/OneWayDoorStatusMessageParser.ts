import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class OneWayDoorStatusMessageParser implements IMessageParser
{
    private _itemId: number;
    private _state: number;

    public flush(): boolean
    {
        this._itemId = 0;
        this._state = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._itemId = wrapper.readInt();
        this._state = wrapper.readInt();

        return true;
    }

    public get itemId(): number
    {
        return this._itemId;
    }

    public get state(): number
    {
        return this._state;
    }
}
