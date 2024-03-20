import { IMessageComposer } from '@nitrots/api';

export class GetClubGiftInfo implements IMessageComposer<ConstructorParameters<typeof GetClubGiftInfo>>
{
    private _data: ConstructorParameters<typeof GetClubGiftInfo>;

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
        this._data = null;
    }
}
