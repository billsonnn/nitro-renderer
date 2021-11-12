import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class GuideSessionGetRequesterRoomMessageComposer implements IMessageComposer<ConstructorParameters<typeof GuideSessionGetRequesterRoomMessageComposer>>
{
    private _data: ConstructorParameters<typeof GuideSessionGetRequesterRoomMessageComposer>;

    constructor()
    {
        this._data = [];
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
