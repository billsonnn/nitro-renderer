import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class RoomSettingsSaveErrorParser implements IMessageParser
{
    public static ERROR_ROOM_NOT_FOUND: number = 1;
    public static ERROR_NOT_OWNER: number = 2;
    public static ERROR_INVALID_DOOR_MODE: number = 3;
    public static ERROR_INVALID_USER_LIMIT: number = 4;
    public static ERROR_INVALID_PASSWORD: number = 5;
    public static ERROR_INVALID_CATEGORY: number = 6;
    public static ERROR_INVALID_NAME: number = 7;
    public static ERROR_UNACCEPTABLE_NAME: number = 8;
    public static ERROR_INVALID_DESCRIPTION: number = 9;
    public static ERROR_UNACCEPTABLE_DESCRIPTION: number = 10;
    public static ERROR_INVALID_TAG: number = 11;
    public static ERROR_NON_USER_CHOOSABLE_TAG: number = 12;
    public static ERROR_TOO_MANY_CHARACTERS_IN_TAG: number = 13;

    private _roomId: number;
    private _code: number;
    private _message: string;

    public flush(): boolean
    {
        this._roomId = 0;
        this._code = 0;
        this._message = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._roomId = wrapper.readInt();
        this._code = wrapper.readInt();
        this._message = wrapper.readString();

        return true;
    }

    public get roomId(): number
    {
        return this._roomId;
    }

    public get code(): number
    {
        return this._code;
    }

    public get message(): string
    {
        return this._message;
    }
}
