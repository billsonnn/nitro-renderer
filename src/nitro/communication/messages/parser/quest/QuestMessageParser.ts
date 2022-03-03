import { IMessageDataWrapper } from '../../../../../core';
import { QuestMessageData } from '../../incoming/quest/QuestMessageData';
import { IMessageParser } from './../../../../../core';

export class QuestMessageParser implements IMessageParser
{
    private _quest: QuestMessageData;

    public flush(): boolean
    {
        this._quest = null;
        return true;
    }

    public parse(wrapper:IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._quest = new QuestMessageData(wrapper);
        return true;
    }

    public get quest():QuestMessageData
    {
        return this._quest;
    }
}
