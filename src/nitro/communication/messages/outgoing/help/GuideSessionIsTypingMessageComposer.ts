import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class GuideSessionIsTypingMessageComposer implements IMessageComposer<ConstructorParameters<typeof GuideSessionIsTypingMessageComposer>>
{
    private _data: ConstructorParameters<typeof GuideSessionIsTypingMessageComposer>;

    constructor(k:boolean)
    {
        this._data = [k];
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
