import { IMessageComposer } from '../../../../../api';

export class ForwardToARandomPromotedRoomMessageComposer implements IMessageComposer<ConstructorParameters<typeof ForwardToARandomPromotedRoomMessageComposer>>
{
    private _data: ConstructorParameters<typeof ForwardToARandomPromotedRoomMessageComposer>;

    constructor(flatId: string)
    {
        this._data = [flatId];
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
