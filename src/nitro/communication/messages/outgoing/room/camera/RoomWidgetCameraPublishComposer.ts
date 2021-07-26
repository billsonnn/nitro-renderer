import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RoomWidgetCameraPublishComposer implements IMessageComposer<ConstructorParameters<typeof RoomWidgetCameraPublishComposer>>
{
    private _data: ConstructorParameters<typeof RoomWidgetCameraPublishComposer>;

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
