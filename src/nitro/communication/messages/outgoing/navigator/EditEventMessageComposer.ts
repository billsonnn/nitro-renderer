import { IMessageComposer } from '../../../../../api';

export class EditEventMessageComposer implements IMessageComposer<ConstructorParameters<typeof EditEventMessageComposer>>
{
    private _data: ConstructorParameters<typeof EditEventMessageComposer>;

    constructor(adId: number, eventName: string, eventDesc: string)
    {
        this._data = [adId, eventName, eventDesc];
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
