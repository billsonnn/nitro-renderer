import { IMessageComposer } from '@nitrots/api';

export class CreateFlatMessageComposer implements IMessageComposer<ConstructorParameters<typeof CreateFlatMessageComposer>>
{
    private _data: ConstructorParameters<typeof CreateFlatMessageComposer>;

    constructor(roomName: string, roomDesc: string, modelName: string, categoryId: number, maxVisitors: number, tradeType: number)
    {
        this._data = [roomName, roomDesc, modelName, categoryId, maxVisitors, tradeType];
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
