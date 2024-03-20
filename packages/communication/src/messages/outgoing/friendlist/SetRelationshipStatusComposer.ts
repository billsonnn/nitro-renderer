import { IMessageComposer } from '@nitrots/api';

export class SetRelationshipStatusComposer implements IMessageComposer<ConstructorParameters<typeof SetRelationshipStatusComposer>>
{
    private _data: ConstructorParameters<typeof SetRelationshipStatusComposer>;

    constructor(userId: number, relationship: number)
    {
        this._data = [userId, relationship];
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
