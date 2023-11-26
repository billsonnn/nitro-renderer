import { IMessageComposer } from '../../../../../api';

export class ForwardToSomeRoomMessageComposer implements IMessageComposer<ConstructorParameters<typeof ForwardToSomeRoomMessageComposer>>
{
    private _data: ConstructorParameters<typeof ForwardToSomeRoomMessageComposer>;

    constructor(type: string)
    {
        this._data = [type];
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
