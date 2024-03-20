import { IMessageComposer } from '@nitrots/api';
import { ModBanMessageComposer } from './ModBanMessageComposer';

export class ModTradingLockMessageComposer implements IMessageComposer<ConstructorParameters<typeof ModTradingLockMessageComposer>>
{
    private _data: ConstructorParameters<typeof ModTradingLockMessageComposer>;

    constructor(k: number, arg2: string, arg3: number, arg4: number, arg5: number = -1)
    {
        this._data = [k, arg2, arg3, arg4];

        if(arg5 != ModBanMessageComposer.NO_ISSUE_ID)
        {
            this._data.push(arg5);
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
