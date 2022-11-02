import { IMessageDataWrapper } from '../../../../../api';
import { ChatlineData } from './ChatlineData';

export class ChatRecordData
{
    public static readonly TYPE_SIMPLE = 0;
    public static readonly TYPE_ROOM_CHAT = 1;
    public static readonly TYPE_IM_SESSION = 2;
    public static readonly TYPE_DISCUSSION_THREAD = 3;
    public static readonly TYPE_DISCUSSION_MESSAGE = 4;
    public static readonly TYPE_SELFIE = 5;
    public static readonly TYPE_PHOTO = 6;

    private _recordType: number;
    private _context: Map<string, any>;
    private _chatlog: ChatlineData[];

    constructor(wrapper: IMessageDataWrapper)
    {
        this._context = new Map();
        this._chatlog = [];

        this._recordType = wrapper.readByte();
        const contextCount = wrapper.readShort();

        for(let i = 0; i < contextCount; i++)
        {
            const key = wrapper.readString();
            const type = wrapper.readByte();

            switch(type)
            {
                case 0:
                    this._context.set(key, wrapper.readBoolean());
                    break;
                case 1:
                    this._context.set(key, wrapper.readInt());
                    break;
                case 2:
                    this._context.set(key, wrapper.readString());
                    break;
                default:
                    throw new Error('Unknown data type ' + type);
            }
        }

        const chatCount = wrapper.readShort();

        for(let i = 0; i < chatCount; i++)
        {
            const timestamp = wrapper.readString();
            const habboId = wrapper.readInt();
            const username = wrapper.readString();
            const message = wrapper.readString();
            const hasHighlighting = wrapper.readBoolean();

            this._chatlog.push(new ChatlineData(timestamp, habboId, username, message, hasHighlighting));
        }
    }

    public get recordType(): number
    {
        return this._recordType;
    }

    public get context(): Map<string, any>
    {
        return this._context;
    }

    public get chatlog(): ChatlineData[]
    {
        return this._chatlog;
    }

    public get roomId(): number
    {
        return this.getInt('roomId');
    }

    public get roomName(): string
    {
        return this._context.get('roomName') as string;
    }

    public get groupId(): number
    {
        return this.getInt('groupId');
    }

    public get threadId(): number
    {
        return this.getInt('threadId');
    }

    public get messageId(): number
    {
        return this.getInt('messageId');
    }

    private getInt(k: string): number
    {
        const value = this._context.get(k);
        if(!value)
        {
            return 0;
        }
        return value as number;
    }
}
