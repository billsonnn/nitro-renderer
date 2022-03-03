import { IMessageDataWrapper, IMessageParser } from '../../../../../../core';
import { RoomChatSettings } from './RoomChatSettings';
import { RoomModerationSettings } from './RoomModerationSettings';

export class RoomSettingsParser implements IMessageParser
{
    private _roomId: number;
    private _name: string;
    private _description: string;
    private _state: number;
    private _categoryId: number;
    private _userCount: number;
    private _maxUserCount: number;
    private _tags: string[];
    private _tradeMode: number;
    private _allowPets: number;
    private _allowPetsEat: number;
    private _allowWalkthrough: number;
    private _hideWalls: number;
    private _thicknessWall: number;
    private _thicknessFloor: number;
    private _chat: RoomChatSettings;
    private _moderation: RoomModerationSettings;

    public flush(): boolean
    {
        this._roomId = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._roomId = wrapper.readInt();
        this._name = wrapper.readString();
        this._description = wrapper.readString();
        this._state = wrapper.readInt();
        this._categoryId = wrapper.readInt();
        this._userCount = wrapper.readInt();
        this._maxUserCount = wrapper.readInt();

        this.parseTags(wrapper);

        this._tradeMode = wrapper.readInt();
        this._allowPets = wrapper.readInt();
        this._allowPetsEat = wrapper.readInt();
        this._allowWalkthrough = wrapper.readInt();
        this._hideWalls = wrapper.readInt();
        this._thicknessWall = wrapper.readInt();
        this._thicknessFloor = wrapper.readInt();
        this._chat = new RoomChatSettings(wrapper);
        wrapper.readBoolean();
        this._moderation = new RoomModerationSettings(wrapper);

        return true;
    }

    private parseTags(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._tags = [];

        let totalTags = wrapper.readInt();

        while(totalTags > 0)
        {
            this._tags.push(wrapper.readString());

            totalTags--;
        }

        return true;
    }

    public get roomId(): number
    {
        return this._roomId;
    }

    public get name(): string
    {
        return this._name;
    }

    public get description(): string
    {
        return this._description;
    }

    public get state(): number
    {
        return this._state;
    }

    public get categoryId(): number
    {
        return this._categoryId;
    }

    public get userCount(): number
    {
        return this._userCount;
    }

    public get maxUserCount(): number
    {
        return this._maxUserCount;
    }

    public get tags(): string[]
    {
        return this._tags;
    }

    public get tradeMode(): number
    {
        return this._tradeMode;
    }

    public get allowPets(): boolean
    {
        return this._allowPets === 1;
    }

    public get allowPetsEat(): boolean
    {
        return this._allowPetsEat === 1;
    }

    public get allowWalkthrough(): boolean
    {
        return this._allowWalkthrough === 1;
    }

    public get hideWalls(): boolean
    {
        return this._hideWalls === 1;
    }

    public get thicknessWall(): number
    {
        return this._thicknessWall;
    }

    public get thicknessFloor(): number
    {
        return this._thicknessFloor;
    }

    public get chatSettings(): RoomChatSettings
    {
        return this._chat;
    }

    public get moderationSettings(): RoomModerationSettings
    {
        return this._moderation;
    }
}
