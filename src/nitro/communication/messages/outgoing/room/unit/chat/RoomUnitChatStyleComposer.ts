import { IMessageComposer } from '../../../../../../../api';

export class RoomUnitChatStyleComposer implements IMessageComposer<ConstructorParameters<typeof RoomUnitChatStyleComposer>>
{
    private _data: ConstructorParameters<typeof RoomUnitChatStyleComposer>;

    constructor(styleId: number)
    {
        this._data = [styleId];
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
