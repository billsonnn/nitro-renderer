import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class NowPlayingMessageParser implements IMessageParser
{
    private _currentSongId: number;
    private _currentPosition: number;
    private _nextSongId: number;
    private _nextPosition: number;
    private _syncCount: number;

    flush(): boolean
    {
        this._currentSongId = -1;
        this._currentPosition = -1;
        this._nextSongId = -1;
        this._nextPosition = -1;
        this._syncCount = -1;
        return true;
    }

    parse(wrapper: IMessageDataWrapper): boolean
    {
        this._currentSongId = wrapper.readInt();
        this._currentPosition = wrapper.readInt();
        this._nextSongId = wrapper.readInt();
        this._nextPosition = wrapper.readInt();
        this._syncCount = wrapper.readInt();
        return true;
    }

    public get currentSongId(): number
    {
        return this._currentSongId;
    }

    public get currentPosition(): number
    {
        return this._currentPosition;
    }

    public get nextSongId(): number
    {
        return this._nextSongId;
    }

    public get nextPosition(): number
    {
        return this._nextPosition;
    }

    public get syncCount(): number
    {
        return this._syncCount;
    }

}
