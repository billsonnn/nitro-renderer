import { IMessageComposer } from '@nitrots/api';

export class NavigatorSettingsSaveComposer implements IMessageComposer<ConstructorParameters<typeof NavigatorSettingsSaveComposer>>
{
    private _data: ConstructorParameters<typeof NavigatorSettingsSaveComposer>;

    constructor(x: number, y: number, width: number, height: number, leftSideOpen: boolean, mode: number)
    {
        this._data = [x, y, width, height, leftSideOpen, mode];
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
