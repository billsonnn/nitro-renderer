import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { QuestMessageData } from './QuestMessageData';

export class QuestMessageParser implements IMessageParser
{
    private _quest: QuestMessageData;

    public flush(): boolean
    {
        this._quest = null;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._quest = new QuestMessageData(wrapper);
        return true;
    }

    public get quest(): QuestMessageData
    {
        return this._quest;
    }
}
