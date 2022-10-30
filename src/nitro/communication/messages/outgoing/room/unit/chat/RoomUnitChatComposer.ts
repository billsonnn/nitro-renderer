import { IMessageComposer } from '../../../../../../../api';

export class RoomUnitChatComposer implements IMessageComposer<ConstructorParameters<typeof RoomUnitChatComposer>>
{
    private _data: ConstructorParameters<typeof RoomUnitChatComposer>;

    constructor(message: string, styleId: number = 0)
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
