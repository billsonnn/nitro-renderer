import { IChatlog } from './IChatlog';

export class ModtoolUserChatlogParserChatlog implements IChatlog
{
    private readonly _timestamp: string;
    private readonly _userId: number;
    private readonly _userName: string;
    private readonly _message: string;
    private readonly _bool: boolean;

    constructor(timestamp: string, userId: number, userName: string, message: string, bool: boolean)
    {
        this._timestamp = timestamp;
        this._userId = userId;
        this._userName = userName;
        this._message = message;
        this._bool = bool;
    }

    public get timestamp(): string
    {
        return this._timestamp;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get userName(): string
    {
        return this._userName;
    }

    public get message(): string
    {
        return this._message;
    }

    public get bool(): boolean
    {
        return this._bool;
    }
}
