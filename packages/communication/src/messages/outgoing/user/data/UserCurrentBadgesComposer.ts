import { IMessageComposer } from '@nitrots/api';

export class UserCurrentBadgesComposer implements IMessageComposer<ConstructorParameters<typeof UserCurrentBadgesComposer>>
{
    private _data: ConstructorParameters<typeof UserCurrentBadgesComposer>;

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
