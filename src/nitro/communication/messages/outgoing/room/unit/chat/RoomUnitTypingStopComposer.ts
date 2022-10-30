import { IMessageComposer } from '../../../../../../../api';

export class RoomUnitTypingStopComposer implements IMessageComposer<ConstructorParameters<typeof RoomUnitTypingStopComposer>>
{
    private _data: ConstructorParameters<typeof RoomUnitTypingStopComposer>;

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
