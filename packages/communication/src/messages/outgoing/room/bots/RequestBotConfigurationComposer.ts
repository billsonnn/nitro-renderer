import { IMessageComposer } from '@nitrots/api';

export class RequestBotCommandConfigurationComposer implements IMessageComposer<ConstructorParameters<typeof RequestBotCommandConfigurationComposer>>
{
    private _data: ConstructorParameters<typeof RequestBotCommandConfigurationComposer>;

    constructor(botId: number, skillId: number)
    {
        this._data = [botId, skillId];
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
