import { IMessageComposer } from '@nitrots/api';

export class UpdateActionMessageComposer implements IMessageComposer<unknown[]>
{
    private _data: unknown[];

    constructor(id: number, ints: number[], string: string, stuffs: number[], delay: number, selectionCode: number)
    {
        this._data = [id, ints.length, ...ints, string, stuffs.length, ...stuffs, delay, selectionCode];
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
