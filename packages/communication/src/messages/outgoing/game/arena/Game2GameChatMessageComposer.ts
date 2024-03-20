import { IMessageComposer } from '@nitrots/api';

export class Game2GameChatMessageComposer implements IMessageComposer<ConstructorParameters<typeof Game2GameChatMessageComposer>>
{
    private _data: ConstructorParameters<typeof Game2GameChatMessageComposer>;

    constructor(chatLine: string)
    {
        this._data = [ chatLine ];
    }

    dispose(): void
    {
        this._data = null;
    }

    public getMessageArray()
    {
        return this._data;
    }
}
