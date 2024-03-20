import { IMessageComposer } from '@nitrots/api';

export class UserSettingsCameraFollowComposer implements IMessageComposer<ConstructorParameters<typeof UserSettingsCameraFollowComposer>>
{
    private _data: ConstructorParameters<typeof UserSettingsCameraFollowComposer>;

    constructor(value: boolean)
    {
        this._data = [value];
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
