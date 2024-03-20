import { IMessageComposer } from '@nitrots/api';

export class BotSkillSaveComposer implements IMessageComposer<ConstructorParameters<typeof BotSkillSaveComposer>>
{
    private _data: ConstructorParameters<typeof BotSkillSaveComposer>;

    constructor(botId: number, skill: number, data: string)
    {
        this._data = [botId, skill, data];
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
