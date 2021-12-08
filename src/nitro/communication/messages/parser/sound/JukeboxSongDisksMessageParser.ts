import { IMessageDataWrapper, IMessageParser } from '../../../../../core';

export class JukeboxSongDisksMessageParser implements IMessageParser
{
    private _songDisks: Map<number, number> = new Map();
    private _maxLength: number;

    flush(): boolean
    {
        this._songDisks.clear();
        this._maxLength = 0;
        return true;
    }

    parse(wrapper: IMessageDataWrapper): boolean
    {
        this._maxLength = wrapper.readInt();
        const count = wrapper.readInt();

        for(let i = 0; i < count; i++)
        {
            this._songDisks.set(wrapper.readInt(), wrapper.readInt());
        }

        return true;
    }

    public get songDisks(): Map<number, number>
    {
        return this._songDisks;
    }

    public get maxLength(): number
    {
        return this._maxLength;
    }
}
