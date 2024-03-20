import { IMessageComposer } from '@nitrots/api';

export class UserSettingsSoundComposer implements IMessageComposer<ConstructorParameters<typeof UserSettingsSoundComposer>>
{
    private _data: ConstructorParameters<typeof UserSettingsSoundComposer>;

    constructor(volumeSystem: number, volumeFurni: number, volumeTrax: number)
    {
        this._data = [volumeSystem, volumeFurni, volumeTrax];
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
