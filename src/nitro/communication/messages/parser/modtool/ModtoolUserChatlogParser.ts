import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';
import { ModtoolUserChatlogParserVisit } from './utils/ModtoolUserChatlogParserVisit';
import { ModtoolUserChatlogParserChatlog } from './utils/ModtoolUserChatlogParserChatlog';

export class ModtoolUserChatlogParser implements IMessageParser
{
    private _id: number;
    private _username: string;
    private _size: number;
    private _roomVisits: ModtoolUserChatlogParserVisit[] = [];

    public flush(): boolean
    {
        this._id   = null;
        this._username = null;
        this._size = null;
        this._roomVisits = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._id   = wrapper.readInt();
        this._username = wrapper.readString();
        this._size = wrapper.readInt();
        for(let i = 0; i < this._size; i++)
        {
            wrapper.readByte();
            wrapper.readShort();
            wrapper.readString();
            wrapper.readByte();
            const roomName = wrapper.readString();
            wrapper.readString();
            wrapper.readByte();
            const roomId = wrapper.readInt();

            const chatlogs = [];

            const chatlogSize = wrapper.readShort();

            for(let i = 0; i < chatlogSize; i++)
            {
                const timestamp = wrapper.readString();
                const userId = wrapper.readInt();
                const userName = wrapper.readString();
                const message = wrapper.readString();
                const bool = wrapper.readBoolean();
                chatlogs.push(new ModtoolUserChatlogParserChatlog(timestamp, userId, userName, message, bool));
            }

            this._roomVisits.push(new ModtoolUserChatlogParserVisit(roomName, roomId, chatlogs));
        }

        return true;
    }

    public get id(): number
    {
        return this._id;
    }

    public get username(): string
    {
        return this._username;
    }

    public get roomVisits(): ModtoolUserChatlogParserVisit[]
    {
        return this._roomVisits;
    }

}
