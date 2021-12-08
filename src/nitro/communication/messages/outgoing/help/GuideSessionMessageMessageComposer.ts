import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class GuideSessionMessageMessageComposer implements IMessageComposer<ConstructorParameters<typeof GuideSessionMessageMessageComposer>>
{
    private _data: ConstructorParameters<typeof GuideSessionMessageMessageComposer>;

    constructor(k:string)
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
