import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class UserRelationshipsComposer implements IMessageComposer<ConstructorParameters<typeof UserRelationshipsComposer>>
{
    private _data: ConstructorParameters<typeof UserRelationshipsComposer>;

    constructor(userId: number)
    {
        this._data = [ userId ];
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