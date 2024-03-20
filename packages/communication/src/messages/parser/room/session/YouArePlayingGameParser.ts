import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class YouArePlayingGameParser implements IMessageParser
{
    private _isPlaying: boolean;

    public flush(): boolean
    {
        this._isPlaying = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._isPlaying = wrapper.readBoolean();

        return true;
    }

    public get isPlaying(): boolean
    {
        return this._isPlaying;
    }
}
