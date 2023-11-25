import { IMessageComposer } from '../../../../../api';

export class VoteForRoomMessageComposer implements IMessageComposer<ConstructorParameters<typeof VoteForRoomMessageComposer>>
{
    private _data: ConstructorParameters<typeof VoteForRoomMessageComposer>;

    constructor(goalCode: string)
    {
        this._data = [goalCode];
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
