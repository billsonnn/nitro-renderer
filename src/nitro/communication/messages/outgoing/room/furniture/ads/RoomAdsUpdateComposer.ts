import { IMessageComposer } from '../../../../../../../core/communication/messages/IMessageComposer';

export class RoomAdsUpdateComposer implements IMessageComposer<any[]>
{
    private _data: any[];

    constructor(k: number, _arg_2: Map<string, string>)
    {
        this._data = [ k, (_arg_2.size * 2) ];

        for(const [ key, value ] of _arg_2.entries()) this._data.push( key, value );
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
