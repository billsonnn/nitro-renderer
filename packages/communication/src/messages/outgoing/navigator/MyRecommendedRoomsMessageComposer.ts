import { IMessageComposer } from '@nitrots/api';

export class MyRecommendedRoomsMessageComposer implements IMessageComposer<ConstructorParameters<typeof MyRecommendedRoomsMessageComposer>>
{
    private _data: ConstructorParameters<typeof MyRecommendedRoomsMessageComposer>;

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
