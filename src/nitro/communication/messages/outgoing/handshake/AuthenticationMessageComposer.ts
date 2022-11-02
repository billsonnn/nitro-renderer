import { IMessageComposer } from '../../../../../api';

export class AuthenticationMessageComposer implements IMessageComposer<string[]>
{
    private _type: string;
    private _data: string[];

    constructor(type: string, keys: string[], values: string[])
    {
        this._type = type;

        if(keys.length !== values.length) return;

        this._data = [];

        for(let i = 0; i < keys.length; i++)
        {
            this._data.push(keys[i]);
            this._data.push(values[i]);
        }
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
