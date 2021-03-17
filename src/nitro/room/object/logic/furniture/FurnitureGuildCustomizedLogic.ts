import { RoomObjectUpdateMessage } from '../../../../../room/messages/RoomObjectUpdateMessage';
import { ObjectDataUpdateMessage } from '../../../messages/ObjectDataUpdateMessage';
import { StringDataType } from '../../data/type/StringDataType';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureGuildCustomizedLogic extends FurnitureMultiStateLogic
{
    public static GROUPID_KEY: number   = 1;
    public static BADGE_KEY: number     = 2;
    public static COLOR1_KEY: number    = 3;
    public static COLOR2_KEY: number    = 4;

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        super.processUpdateMessage(message);

        if(message instanceof ObjectDataUpdateMessage)
        {
            const data = message.data;

            if(data instanceof StringDataType)
            {
                this.updateGroupId(data.getValue(FurnitureGuildCustomizedLogic.GROUPID_KEY));
                this.updateBadge(data.getValue(FurnitureGuildCustomizedLogic.BADGE_KEY));
                this.updateColors(data.getValue(FurnitureGuildCustomizedLogic.COLOR1_KEY), data.getValue(FurnitureGuildCustomizedLogic.COLOR2_KEY));
            }
        }
    }

    private updateGroupId(id: string): void
    {
        this.object.model.setValue(RoomObjectVariable.FURNITURE_GUILD_CUSTOMIZED_GUILD_ID, parseInt(id));
    }

    private updateBadge(badge: string): void
    {
        this.object.model.setValue(RoomObjectVariable.FURNITURE_GUILD_CUSTOMIZED_BADGE, badge);
    }

    public updateColors(color1: string, color2: string): void
    {
        this.object.model.setValue(RoomObjectVariable.FURNITURE_GUILD_CUSTOMIZED_COLOR_1, parseInt(color1, 16));
        this.object.model.setValue(RoomObjectVariable.FURNITURE_GUILD_CUSTOMIZED_COLOR_2, parseInt(color2, 16));
    }
}