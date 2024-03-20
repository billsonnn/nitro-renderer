import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class MuteAllInRoomParser implements IMessageParser
{
    private _isMuted: boolean;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._isMuted = wrapper.readBoolean();

        return true;
    }

    public get isMuted(): boolean
    {
        return this._isMuted;
    }
}
