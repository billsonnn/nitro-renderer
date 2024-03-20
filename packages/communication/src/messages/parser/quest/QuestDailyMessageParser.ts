import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { QuestMessageData } from './QuestMessageData';

export class QuestDailyMessageParser implements IMessageParser
{
    private _quest: QuestMessageData;
    private _easyQuestCount: number;
    private _hardQuestCount: number;

    public flush(): boolean
    {
        this._quest = null;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        const _local_2 = wrapper.readBoolean();
        if(_local_2)
        {
            this._quest = new QuestMessageData(wrapper);
            this._easyQuestCount = wrapper.readInt();
            this._hardQuestCount = wrapper.readInt();
        }
        return true;
    }

    public get quest(): QuestMessageData
    {
        return this._quest;
    }

    public get easyQuestCount(): number
    {
        return this._easyQuestCount;
    }

    public get hardQuestCount(): number
    {
        return this._hardQuestCount;
    }
}
