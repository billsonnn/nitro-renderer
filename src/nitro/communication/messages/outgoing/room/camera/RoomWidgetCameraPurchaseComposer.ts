import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RoomWidgetCameraPurchaseComposer implements IMessageComposer<ConstructorParameters<typeof RoomWidgetCameraPurchaseComposer>>
{
    private _data: ConstructorParameters<typeof RoomWidgetCameraPurchaseComposer>;

    constructor()
    {
        this._data = [];
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
