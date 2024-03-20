import { IMessageComposer } from '@nitrots/api';

export class UpdateFloorPropertiesMessageComposer implements IMessageComposer<ConstructorParameters<typeof UpdateFloorPropertiesMessageComposer>>
{
    private _data: ConstructorParameters<typeof UpdateFloorPropertiesMessageComposer>;

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
