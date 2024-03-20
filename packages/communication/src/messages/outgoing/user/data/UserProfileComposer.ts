import { IMessageComposer } from '@nitrots/api';

export class UserProfileComposer implements IMessageComposer<ConstructorParameters<typeof UserProfileComposer>>
{
    private _data: ConstructorParameters<typeof UserProfileComposer>;

    constructor(userId: number, flag: boolean = true)
    {
        this._data = [userId, flag];
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
