import { IMessageComposer } from '../../../../../api';

export class GuideSessionFeedbackMessageComposer implements IMessageComposer<ConstructorParameters<typeof GuideSessionFeedbackMessageComposer>>
{
    private _data: ConstructorParameters<typeof GuideSessionFeedbackMessageComposer>;

    constructor(k: boolean)
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
