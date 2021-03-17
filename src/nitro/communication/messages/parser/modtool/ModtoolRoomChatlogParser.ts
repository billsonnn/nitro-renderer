import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';
import { ModtoolRoomChatlogLine } from './utils/ModtoolRoomChatlogLine';

export class ModtoolRoomChatlogParser implements IMessageParser
{
    private _id: number;
    private _name: string;
    private _chatlogCount: number;
    private _chatlogs: ModtoolRoomChatlogLine[] = [];

    public flush(): boolean
    {
        this._id   = null;
        this._name = null;
        this._chatlogCount = 0;
        this._chatlogs = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        wrapper.readByte();
        wrapper.readShort();
        wrapper.readString();
        wrapper.readByte();
        this._name = wrapper.readString();
        wrapper.readString();
        wrapper.readByte();
        this._id   = wrapper.readInt();
        this._chatlogCount = wrapper.readShort();

        for(let i = 0; i < this._chatlogCount; i++)
        {
            const timestamp = wrapper.readString();
            const habboId = wrapper.readInt();
            const username = wrapper.readString();
            const message = wrapper.readString();
            const boolean = wrapper.readBoolean();

            this._chatlogs.push(new ModtoolRoomChatlogLine(timestamp, habboId, username, message, boolean));
        }

        return true;
    }

    public get id(): number
    {
        return this._id;
    }

    public get name(): string
    {
        return this._name;
    }

    public get chatlogs(): ModtoolRoomChatlogLine[]
    {
        return this._chatlogs;
    }

}
