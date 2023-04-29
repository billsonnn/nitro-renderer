import { IMessageComposer } from '../../../../../api';

export class UpdateRoomCategoryAndTradeSettingsComposer implements IMessageComposer<ConstructorParameters<typeof UpdateRoomCategoryAndTradeSettingsComposer>>
{
    private _data: ConstructorParameters<typeof UpdateRoomCategoryAndTradeSettingsComposer>;

    constructor(k: number, _arg_2: number, _arg_3: number)
    {
        this._data = [k, _arg_2, _arg_3];
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
