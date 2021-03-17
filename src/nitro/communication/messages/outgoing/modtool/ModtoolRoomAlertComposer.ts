import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class ModtoolRoomAlertComposer implements IMessageComposer<any>
{
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
