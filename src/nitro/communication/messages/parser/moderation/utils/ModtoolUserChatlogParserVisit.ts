import { ModtoolUserChatlogParserChatlog } from './ModtoolUserChatlogParserChatlog';
import { IChatlog } from './IChatlog';

export class ModtoolUserChatlogParserVisit
{
    private readonly _roomName: string;
    private readonly _roomId: number;
    private readonly _chatlogs: IChatlog[];

    constructor(roomName: string, roomId: number, chatlogs: IChatlog[])
    {
        this._roomName = roomName;
        this._roomId = roomId;
        this._chatlogs = chatlogs;
    }

    public get roomName(): string
    {
        return this._roomName;
    }

    public get roomId(): number
    {
        return this._roomId;
    }

    public get chatlogs(): IChatlog[]
    {
        return this._chatlogs;
    }
}
