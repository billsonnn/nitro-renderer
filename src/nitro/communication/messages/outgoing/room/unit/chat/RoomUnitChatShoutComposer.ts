import { IMessageComposer } from '../../../../../../../api';

export class RoomUnitChatShoutComposer implements IMessageComposer<ConstructorParameters<typeof RoomUnitChatShoutComposer>>
{
    private _data: ConstructorParameters<typeof RoomUnitChatShoutComposer>;

    constructor(message: string, styleId: number)
    {
        this._data = [message, styleId];
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
