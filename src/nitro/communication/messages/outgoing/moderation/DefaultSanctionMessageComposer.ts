import { IMessageComposer } from '../../../../../api';
import { ModBanMessageComposer } from './ModBanMessageComposer';

export class DefaultSanctionMessageComposer implements IMessageComposer<ConstructorParameters<typeof DefaultSanctionMessageComposer>>
{
    private _data: ConstructorParameters<typeof DefaultSanctionMessageComposer>;

    constructor(k: number, _arg_2: number, _arg_3: string, _arg_4: number = -1)
    {
        this._data = [k, _arg_2, _arg_3];
        if(_arg_4 != ModBanMessageComposer.NO_ISSUE_ID)
        {
            this._data.push(_arg_4);
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
