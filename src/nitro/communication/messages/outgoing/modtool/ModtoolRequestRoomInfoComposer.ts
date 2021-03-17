import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class ModtoolRequestRoomInfoComposer implements IMessageComposer<ConstructorParameters<typeof ModtoolRequestRoomInfoComposer>>
{
    private _data: ConstructorParameters<typeof ModtoolRequestRoomInfoComposer>;

    constructor(roomId: number)
    {
        this._data = [ roomId ];
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
