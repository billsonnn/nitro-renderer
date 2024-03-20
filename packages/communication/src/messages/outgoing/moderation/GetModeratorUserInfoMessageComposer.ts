import { IMessageComposer } from '@nitrots/api';

export class GetModeratorUserInfoMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetModeratorUserInfoMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetModeratorUserInfoMessageComposer>;

    constructor(userId: number)
    {
        this._data = [userId];
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
