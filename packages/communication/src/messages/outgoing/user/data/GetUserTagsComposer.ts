import { IMessageComposer } from '@nitrots/api';

export class GetUserTagsComposer implements IMessageComposer<ConstructorParameters<typeof GetUserTagsComposer>>
{
    private _data: ConstructorParameters<typeof GetUserTagsComposer>;

    constructor(roomUnitId: number)
    {
        this._data = [roomUnitId];
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
