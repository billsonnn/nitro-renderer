import { IMessageComposer } from '../../../../../../../core/communication/messages/IMessageComposer';

export class LoveLockStartConfirmComposer implements IMessageComposer<ConstructorParameters<typeof LoveLockStartConfirmComposer>>
{
    private _data: ConstructorParameters<typeof LoveLockStartConfirmComposer>;

    constructor(itemId: number, confirmed: boolean)
    {
        this._data = [ itemId, confirmed ];
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
