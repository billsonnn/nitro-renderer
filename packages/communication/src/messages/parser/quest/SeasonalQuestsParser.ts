import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { QuestMessageData } from './QuestMessageData';

export class SeasonalQuestsParser implements IMessageParser
{
    private _quests: QuestMessageData[];

    public flush(): boolean
    {
        this._quests = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        const count = wrapper.readInt();

        for(let i = 0; i < count; i++)
        {
            this._quests.push(new QuestMessageData(wrapper));
        }

        return true;
    }

    public get quests(): QuestMessageData[]
    {
        return this._quests;
    }
}
