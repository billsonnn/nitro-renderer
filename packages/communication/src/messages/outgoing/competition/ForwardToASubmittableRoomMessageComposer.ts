import { IMessageComposer } from '@nitrots/api';

export class ForwardToASubmittableRoomMessageComposer implements IMessageComposer<ConstructorParameters<typeof ForwardToASubmittableRoomMessageComposer>>
{
    private _data: ConstructorParameters<typeof ForwardToASubmittableRoomMessageComposer>;

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
