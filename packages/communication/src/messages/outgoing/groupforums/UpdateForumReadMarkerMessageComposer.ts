import { IMessageComposer } from '@nitrots/api';

export class UpdateForumReadMarkerMessageComposer implements IMessageComposer<any>
{
    private _data: any;

    constructor(...data: UpdateForumReadMarkerEntry[])
    {
        this._data = [data.length];
        data.forEach(entry =>
        {
            this._data.push(entry.k);
            this._data.push(entry._arg_2);
            this._data.push(entry._arg_3);
        });
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

export class UpdateForumReadMarkerEntry
{
    constructor(public k: number, public _arg_2: number, public _arg_3: boolean)
    { }
}
