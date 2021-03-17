import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class UserWardrobeSaveComposer implements IMessageComposer<ConstructorParameters<typeof UserWardrobeSaveComposer>>
{
    private _data: ConstructorParameters<typeof UserWardrobeSaveComposer>;

    constructor(slotId: number, look: string, gender: string)
    {
        this._data = [ slotId, look, gender ];
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
