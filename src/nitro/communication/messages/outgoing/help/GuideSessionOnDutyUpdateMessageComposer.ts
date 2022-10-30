import { IMessageComposer } from '../../../../../api';

export class GuideSessionOnDutyUpdateMessageComposer implements IMessageComposer<ConstructorParameters<typeof GuideSessionOnDutyUpdateMessageComposer>>
{
    private _data: ConstructorParameters<typeof GuideSessionOnDutyUpdateMessageComposer>;

    constructor(k: boolean, _arg_2: boolean, _arg_3: boolean, _arg_4: boolean)
    {
        this._data = [k, _arg_2, _arg_3, _arg_4];
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
