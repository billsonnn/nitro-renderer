import { IMessageComposer } from '../../../../../api';

export class ModToolPreferencesComposer implements IMessageComposer<ConstructorParameters<typeof ModToolPreferencesComposer>>
{
    private _data: ConstructorParameters<typeof ModToolPreferencesComposer>;

    constructor(lastWindowX: number, lastWindowY: number, lastWindowWidth: number, lastWindowHeight: number)
    {
        this._data = [lastWindowX, lastWindowY, lastWindowWidth, lastWindowHeight];
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
