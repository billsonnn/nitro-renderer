import { IMessageComposer } from '../../../../../api';

export class GuideSessionCreateMessageComposer implements IMessageComposer<ConstructorParameters<typeof GuideSessionCreateMessageComposer>>
{
    private _data: ConstructorParameters<typeof GuideSessionCreateMessageComposer>;

    constructor(requestType: number, description: string)
    {
        this._data = [requestType, description];
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
