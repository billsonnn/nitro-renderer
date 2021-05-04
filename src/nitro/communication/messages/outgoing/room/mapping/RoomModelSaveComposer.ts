import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RoomModelSaveComposer implements IMessageComposer<ConstructorParameters<typeof RoomModelSaveComposer>>
{
    private _data: ConstructorParameters<typeof RoomModelSaveComposer>;

    constructor(model: string, doorX: number, doorY: number, doorDirection: number, thicknessWall: number, thicknessFloor: number, wallHeight: number)
    {
        this._data = [model, doorX, doorY, doorDirection, thicknessWall, thicknessFloor, wallHeight];
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