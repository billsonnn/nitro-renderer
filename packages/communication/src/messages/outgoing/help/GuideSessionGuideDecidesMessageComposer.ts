import { IMessageComposer } from '@nitrots/api';

export class GuideSessionGuideDecidesMessageComposer implements IMessageComposer<ConstructorParameters<typeof GuideSessionGuideDecidesMessageComposer>>
{
    private _data: ConstructorParameters<typeof GuideSessionGuideDecidesMessageComposer>;

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
