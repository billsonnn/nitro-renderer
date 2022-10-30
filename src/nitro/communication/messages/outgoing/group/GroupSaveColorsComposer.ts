import { IMessageComposer } from '../../../../../api';

export class GroupSaveColorsComposer implements IMessageComposer<ConstructorParameters<typeof GroupSaveColorsComposer>>
{
    private _data: ConstructorParameters<typeof GroupSaveColorsComposer>;

    constructor(groupId: number, colorA: number, colorB: number)
    {
        this._data = [groupId, colorA, colorB];
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
