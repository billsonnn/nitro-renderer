import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class RoomReadyMessageParser implements IMessageParser
{
    private _name: string;
    private _roomId: number;

    public flush(): boolean
    {
        this._name = null;
        this._roomId = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._name = wrapper.readString();
        this._roomId = wrapper.readInt();

        return true;
    }

    public get name(): string
    {
        return this._name;
    }

    public get roomId(): number
    {
        return this._roomId;
    }
}
