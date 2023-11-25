import { IMessageComposer } from '../../../../../api';

export class GuideSessionFeedbackMessageComposer implements IMessageComposer<ConstructorParameters<typeof GuideSessionFeedbackMessageComposer>>
{
    private _data: ConstructorParameters<typeof GuideSessionFeedbackMessageComposer>;

    constructor(hasPositiveFeedback: boolean)
    {
        this._data = [hasPositiveFeedback];
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
