import { IMessageComposer } from '../../../../../api';

export class GuideSessionMessageMessageComposer implements IMessageComposer<ConstructorParameters<typeof GuideSessionMessageMessageComposer>>
{
    private _data: ConstructorParameters<typeof GuideSessionMessageMessageComposer>;

    constructor(message: string)
    {
        this._data = [message];
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
