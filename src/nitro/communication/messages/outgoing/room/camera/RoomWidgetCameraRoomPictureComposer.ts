import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RoomWidgetCameraRoomPictureComposer implements IMessageComposer<ConstructorParameters<typeof RoomWidgetCameraRoomPictureComposer>>
{
    private _data: ConstructorParameters<typeof RoomWidgetCameraRoomPictureComposer>;

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
