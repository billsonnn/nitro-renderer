import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RoomWidgetCameraConfigurationComposer implements IMessageComposer<ConstructorParameters<typeof RoomWidgetCameraConfigurationComposer>>
{
    private _data: ConstructorParameters<typeof RoomWidgetCameraConfigurationComposer>;

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
