import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class ModtoolRequestUserRoomsComposer implements IMessageComposer<ConstructorParameters<typeof ModtoolRequestUserRoomsComposer>>
{
    private _data: ConstructorParameters<typeof ModtoolRequestUserRoomsComposer>;

    constructor(k: number)
    {
        this._data = [ k ];
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
