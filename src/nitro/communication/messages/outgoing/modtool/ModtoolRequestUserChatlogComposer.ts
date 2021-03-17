import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class ModtoolRequestUserChatlogComposer implements IMessageComposer<ConstructorParameters<typeof ModtoolRequestUserChatlogComposer>>
{
    private _data: ConstructorParameters<typeof ModtoolRequestUserChatlogComposer>;

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
