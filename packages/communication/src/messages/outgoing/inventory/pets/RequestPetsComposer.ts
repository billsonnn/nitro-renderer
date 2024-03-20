import { IMessageComposer } from '@nitrots/api';

export class RequestPetsComposer implements IMessageComposer<ConstructorParameters<typeof RequestPetsComposer>>
{
    private _data: ConstructorParameters<typeof RequestPetsComposer>;

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
