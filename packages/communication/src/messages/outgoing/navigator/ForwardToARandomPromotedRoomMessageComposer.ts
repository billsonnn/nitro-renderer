import { IMessageComposer } from '@nitrots/api';

export class ForwardToARandomPromotedRoomMessageComposer implements IMessageComposer<ConstructorParameters<typeof ForwardToARandomPromotedRoomMessageComposer>>
{
    private _data: ConstructorParameters<typeof ForwardToARandomPromotedRoomMessageComposer>;

    constructor(k: string)
    {
        this._data = [k];
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
