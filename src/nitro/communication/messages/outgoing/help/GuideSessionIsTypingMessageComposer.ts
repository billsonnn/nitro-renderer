import { IMessageComposer } from '../../../../../api';

export class GuideSessionIsTypingMessageComposer implements IMessageComposer<ConstructorParameters<typeof GuideSessionIsTypingMessageComposer>>
{
    private _data: ConstructorParameters<typeof GuideSessionIsTypingMessageComposer>;

    constructor(isTyping: boolean)
    {
        this._data = [isTyping];
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
