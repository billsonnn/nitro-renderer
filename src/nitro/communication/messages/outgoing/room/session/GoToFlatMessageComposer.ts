import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class GoToFlatMessageComposer implements IMessageComposer<ConstructorParameters<typeof GoToFlatMessageComposer>>
{
    private _data: ConstructorParameters<typeof GoToFlatMessageComposer>;

    constructor(roomId: number)
    {
        this._data = [ roomId ];
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
