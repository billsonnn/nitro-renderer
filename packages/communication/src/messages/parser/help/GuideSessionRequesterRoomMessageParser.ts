import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class GuideSessionRequesterRoomMessageParser implements IMessageParser
{
    private _requesterRoomId: number;

    public flush(): boolean
    {
        this._requesterRoomId = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._requesterRoomId = wrapper.readInt();

        return true;
    }

    public get requesterRoomId(): number
    {
        return this._requesterRoomId;
    }
}
