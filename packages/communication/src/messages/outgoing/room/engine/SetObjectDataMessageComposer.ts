import { IMessageComposer } from '@nitrots/api';

export class SetObjectDataMessageComposer implements IMessageComposer<any[]>
{
    private _data: any[];

    constructor(objectId: number, data: Map<string, string>)
    {
        this._data = [objectId, (data.size * 2)];

        for(const [key, value] of data.entries()) this._data.push(key, value);
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
