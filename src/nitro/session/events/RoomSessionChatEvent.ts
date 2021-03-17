import { IRoomSession } from '../IRoomSession';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionChatEvent extends RoomSessionEvent
{
    public static CHAT_EVENT: string   = 'RSCE_CHAT_EVENT';
    public static FLOOD_EVENT: string  = 'RSCE_FLOOD_EVENT';

    public static CHAT_NORMAL: number       = 0;
    public static CHAT_WHISPER: number      = 1;
    public static CHAT_SHOUT: number        = 2;
    public static _Str_5821: number         = 3;
    public static _Str_6081: number         = 4;
    public static _Str_8971: number         = 5;
    public static _Str_5958: number         = 6;
    public static _Str_6065: number         = 7;
    public static _Str_5998: number         = 8;
    public static _Str_5904: number         = 9;
    public static _Str_8909: number         = 10;

    private _objectId: number;
    private _message: string;
    private _chatType: number;
    private _links: string[];
    private _extraParam: number;
    private _style: number;

    constructor(type: string, session: IRoomSession, objectId: number, message: string, chatType: number, style: number = 0, links: string[] = null, extraParam: number = -1)
    {
        super(type, session);

        this._objectId      = objectId;
        this._message       = message;
        this._chatType      = chatType;
        this._links         = links;
        this._extraParam    = extraParam;
        this._style         = style;
    }

    public get objectId(): number
    {
        return this._objectId;
    }

    public get message(): string
    {
        return this._message;
    }

    public get chatType(): number
    {
        return this._chatType;
    }

    public get links(): string[]
    {
        return this._links;
    }

    public get extraParam(): number
    {
        return this._extraParam;
    }

    public get style(): number
    {
        return this._style;
    }
}