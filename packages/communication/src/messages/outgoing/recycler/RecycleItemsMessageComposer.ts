import { IMessageComposer } from '@nitrots/api';

export class RecycleItemsMessageComposer implements IMessageComposer<any>
{
    private _data: any;

    constructor(...data: RecycleItemsEntry[])
    {
        this._data = [data.length];
        data.forEach(entry =>
        {
            this._data.push(entry.itemId);
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

export class RecycleItemsEntry
{
    constructor(public itemId: number)
    { }
}
