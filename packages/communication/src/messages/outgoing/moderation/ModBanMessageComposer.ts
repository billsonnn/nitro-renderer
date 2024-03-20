import { IMessageComposer } from '@nitrots/api';

export class ModBanMessageComposer implements IMessageComposer<ConstructorParameters<typeof ModBanMessageComposer>>
{
    public static readonly NO_ISSUE_ID = -1;

    private _data: ConstructorParameters<typeof ModBanMessageComposer>;

    constructor(k: number, arg2: string, arg3: number, arg4: number, arg5: boolean, arg6: number = -1)
    {
        this._data = [k, arg2, arg3, arg4, arg5];
        if(arg6 != ModBanMessageComposer.NO_ISSUE_ID)
        {
            this._data.push(arg6);
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
