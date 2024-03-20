import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class ConvertedRoomIdMessageParser implements IMessageParser
{
    private _globalId: string;
    private _convertedId: number;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._globalId = wrapper.readString();
        this._convertedId = wrapper.readInt();

        return true;
    }

    public get globalId(): string
    {
        return this._globalId;
    }

    public get convertedId(): number
    {
        return this._convertedId;
    }
}
