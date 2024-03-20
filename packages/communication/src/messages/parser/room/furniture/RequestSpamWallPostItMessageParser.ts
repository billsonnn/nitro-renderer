import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class RequestSpamWallPostItMessageParser implements IMessageParser
{
    private _itemId: number;
    private _location: string;

    public flush(): boolean
    {
        this._itemId = -1;
        this._location = '';

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._itemId = wrapper.readInt();
        this._location = wrapper.readString();

        return true;
    }

    public get itemId(): number
    {
        return this._itemId;
    }

    public get location(): string
    {
        return this._location;
    }
}
