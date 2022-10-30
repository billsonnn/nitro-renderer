import { IMessageComposer } from '../../../../../api';

export class CraftSecretComposer implements IMessageComposer<number[]>
{
    private _data: number[];

    constructor(k: number, _arg_2: number[])
    {
        this._data = [k, _arg_2.length].concat(_arg_2);
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
