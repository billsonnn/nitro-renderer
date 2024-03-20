import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class RoomAdErrorMessageParser implements IMessageParser
{
    private _errorCode: number;
    private _filteredText: string;

    public flush(): boolean
    {
        this._errorCode = 0;
        this._filteredText = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._errorCode = wrapper.readInt();
        this._filteredText = wrapper.readString();

        return true;
    }

    public get errorCode(): number
    {
        return this._errorCode;
    }

    public get filteredText(): string
    {
        return this._filteredText;
    }
}
