import { IMessageComposer } from '../../../../../api';
import { ModBanMessageComposer } from './ModBanMessageComposer';

export class ModMessageMessageComposer implements IMessageComposer<any>
{
    private _data: any[] = [];

    constructor(k: number, arg2: string, arg3: number, arg4: number = -1)
    {
        this._data.push(k);
        this._data.push(arg2);
        this._data.push('');
        this._data.push('');
        this._data.push(arg3);
        if(arg4 != ModBanMessageComposer.NO_ISSUE_ID)
        {
            this._data.push(arg4);
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
