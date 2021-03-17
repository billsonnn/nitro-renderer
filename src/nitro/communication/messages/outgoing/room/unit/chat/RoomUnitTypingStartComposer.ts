import { IMessageComposer } from '../../../../../../../core/communication/messages/IMessageComposer';

export class RoomUnitTypingStartComposer implements IMessageComposer<ConstructorParameters<typeof RoomUnitTypingStartComposer>>
{
    private _data: ConstructorParameters<typeof RoomUnitTypingStartComposer>;

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