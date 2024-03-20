import { IMessageComposer } from '@nitrots/api';

export class BotPlaceComposer implements IMessageComposer<ConstructorParameters<typeof BotPlaceComposer>>
{
    private _data: ConstructorParameters<typeof BotPlaceComposer>;

    constructor(botId: number, x: number, y: number)
    {
        this._data = [botId, x, y];
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
