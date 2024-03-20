import { IMessageComposer } from '@nitrots/api';

export class ModeratorActionMessageComposer implements IMessageComposer<any>
{
    public static readonly ACTION_ALERT = 0;
    public static readonly ACTION_KICK = 1;
    public static readonly ACTION_MESSAGE = 3;
    public static readonly ACTION_MESSAGE_AND_SOFT_KICK = 4;

    private _data: any[] = [];

    constructor(k: number, arg2: string, arg3: string)
    {
        this._data.push(k);
        this._data.push(arg2);
        this._data.push(arg3);
    }

    public getMessageArray()
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}
