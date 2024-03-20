import { IMessageComposer } from '@nitrots/api';

export class PongMessageComposer implements IMessageComposer<ConstructorParameters<typeof PongMessageComposer>>
{
    private _data: ConstructorParameters<typeof PongMessageComposer>;

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
