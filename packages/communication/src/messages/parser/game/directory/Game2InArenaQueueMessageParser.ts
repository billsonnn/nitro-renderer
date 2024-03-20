import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class Game2InArenaQueueMessageParser implements IMessageParser
{
    private _position: number;

    public flush(): boolean
    {
        this._position = -1;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._position = wrapper.readInt();

        return true;
    }

    public get position(): number
    {
        return this._position;
    }
}
