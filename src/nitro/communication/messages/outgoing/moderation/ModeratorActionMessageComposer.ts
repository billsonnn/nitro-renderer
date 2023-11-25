import { IMessageComposer } from '../../../../../api';

export class ModeratorActionMessageComposer implements IMessageComposer<any>
{
    public static readonly ACTION_ALERT = 0;
    public static readonly ACTION_KICK = 1;
    public static readonly ACTION_MESSAGE = 3;
    public static readonly ACTION_MESSAGE_AND_SOFT_KICK = 4;

    private _data: any[] = [];

    constructor(actionState: number, message: string, value: string)
    {
        this._data.push(actionState);
        this._data.push(message);
        this._data.push(value);
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
