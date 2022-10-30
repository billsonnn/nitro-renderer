import { IMessageComposer } from '../../../../../../api';

export class BotRemoveComposer implements IMessageComposer<ConstructorParameters<typeof BotRemoveComposer>>
{
    private _data: ConstructorParameters<typeof BotRemoveComposer>;

    constructor(botId: number)
    {
        this._data = [botId];
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
