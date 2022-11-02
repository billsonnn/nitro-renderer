import { IMessageComposer } from '../../../../../api';
import { ModBanMessageComposer } from './ModBanMessageComposer';

export class ModAlertMessageComposer implements IMessageComposer<ConstructorParameters<typeof ModAlertMessageComposer>>
{
    private _data: ConstructorParameters<typeof ModAlertMessageComposer>;

    constructor(k: number, arg2: string, arg3: number, arg4: number = -1)
    {
        this._data = [k, arg2, arg3];
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
