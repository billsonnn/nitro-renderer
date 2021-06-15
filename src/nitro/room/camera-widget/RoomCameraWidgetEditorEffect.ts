export class RoomCameraWidgetEditorEffect
{
    private _name: string;
    private _colorMatrix: number[];
    private _minLevel: number;

    constructor(name: string, minLevel: number, colorMatrix?: number[])
    {
        this._name = name;
        this._minLevel = minLevel;
        this._colorMatrix = colorMatrix ?? [];
    }

    public get name(): string
    {
        return this._name;
    }

    public get colorMatrix(): number[]
    {
        return this._colorMatrix;
    }

    public get minLevel(): number
    {
        return this._minLevel;
    }
}
