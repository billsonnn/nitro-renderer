import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class ForwardToSomeRoomMessageComposer implements IMessageComposer<ConstructorParameters<typeof ForwardToSomeRoomMessageComposer>>
{
    private _data: ConstructorParameters<typeof ForwardToSomeRoomMessageComposer>;

    constructor(k:string)
    {
        this._data = [ k ];
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
