import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { RoomChatSettings } from './RoomChatSettings';
import { RoomModerationSettings } from './RoomModerationSettings';
import { RoomSettingsData } from './RoomSettingsData';

export class RoomSettingsDataParser implements IMessageParser
{
    private _roomSettingsData: RoomSettingsData;

    public flush(): boolean
    {
        this._roomSettingsData = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._roomSettingsData = new RoomSettingsData();

        this._roomSettingsData.roomId = wrapper.readInt();
        this._roomSettingsData.name = wrapper.readString();
        this._roomSettingsData.description = wrapper.readString();
        this._roomSettingsData.doorMode = wrapper.readInt();
        this._roomSettingsData.categoryId = wrapper.readInt();
        this._roomSettingsData.maximumVisitors = wrapper.readInt();
        this._roomSettingsData.maximumVisitorsLimit = wrapper.readInt();
        this._roomSettingsData.tags = [];

        let totalTags = wrapper.readInt();

        while(totalTags > 0)
        {
            this._roomSettingsData.tags.push(wrapper.readString());

            totalTags--;
        }

        this._roomSettingsData.tradeMode = wrapper.readInt();
        this._roomSettingsData.allowPets = (wrapper.readInt() === 1);
        this._roomSettingsData.allowFoodConsume = (wrapper.readInt() === 1);
        this._roomSettingsData.allowWalkThrough = (wrapper.readInt() === 1);
        this._roomSettingsData.hideWalls = (wrapper.readInt() === 1);
        this._roomSettingsData.wallThickness = wrapper.readInt();
        this._roomSettingsData.floorThickness = wrapper.readInt();
        this._roomSettingsData.chatSettings = new RoomChatSettings(wrapper);
        this._roomSettingsData.allowNavigatorDynamicCats = wrapper.readBoolean();
        this._roomSettingsData.roomModerationSettings = new RoomModerationSettings(wrapper);

        return true;
    }

    public get data(): RoomSettingsData
    {
        return this._roomSettingsData;
    }
}
