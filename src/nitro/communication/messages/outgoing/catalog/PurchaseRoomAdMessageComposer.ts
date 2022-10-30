import { IMessageComposer } from '../../../../../api';

export class PurchaseRoomAdMessageComposer implements IMessageComposer<ConstructorParameters<typeof PurchaseRoomAdMessageComposer>>
{
    private _data: ConstructorParameters<typeof PurchaseRoomAdMessageComposer>;

    constructor(k: number, _arg_2: number, _arg_3: number, _arg_4: string, _arg_5: boolean, _arg_6: string, _arg_7: number)
    {
        this._data = [k, _arg_2, _arg_3, _arg_4, _arg_5, _arg_6, _arg_7];
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
