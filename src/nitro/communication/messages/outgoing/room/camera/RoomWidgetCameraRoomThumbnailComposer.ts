import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RoomWidgetCameraRoomThumbnailComposer implements IMessageComposer<ConstructorParameters<typeof RoomWidgetCameraRoomThumbnailComposer>>
{
    private _data: ConstructorParameters<typeof RoomWidgetCameraRoomThumbnailComposer>;

    constructor(unknownFloat: number, image: number[])
    {
        this._data = [ unknownFloat, image ];
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
