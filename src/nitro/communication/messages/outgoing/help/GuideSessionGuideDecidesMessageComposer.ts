import { IMessageComposer } from '../../../../../api';

export class GuideSessionGuideDecidesMessageComposer implements IMessageComposer<ConstructorParameters<typeof GuideSessionGuideDecidesMessageComposer>>
{
    private _data: ConstructorParameters<typeof GuideSessionGuideDecidesMessageComposer>;

    constructor(hasAccepted: boolean)
    {
        this._data = [hasAccepted];
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
