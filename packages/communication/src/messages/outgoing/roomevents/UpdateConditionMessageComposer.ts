import { IMessageComposer } from '@nitrots/api';

export class UpdateConditionMessageComposer implements IMessageComposer<unknown[]>
{
    private _data: unknown[];

    constructor(id: number, ints: number[], string: string, stuffs: number[], selectionCode: number)
    {
        this._data = [id, ints.length, ...ints, string, stuffs.length, ...stuffs, selectionCode];
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
