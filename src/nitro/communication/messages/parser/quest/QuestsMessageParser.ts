import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { QuestMessageData } from './QuestMessageData';

export class QuestsMessageParser implements IMessageParser
{
    private _quests: QuestMessageData[];
    private _openWindow: boolean;


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

        this._openWindow = wrapper.readBoolean();
        return true;
    }

    public get quests(): QuestMessageData[]
    {
        return this._quests;
    }

    public get openWindow(): boolean
    {
        return this._openWindow;
    }
}
