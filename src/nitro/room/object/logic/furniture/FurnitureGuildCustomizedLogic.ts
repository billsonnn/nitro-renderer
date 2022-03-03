import { IRoomGeometry, RoomSpriteMouseEvent } from '../../../../../room';
import { RoomObjectUpdateMessage } from '../../../../../room/messages/RoomObjectUpdateMessage';
import { Nitro } from '../../../../Nitro';
import { MouseEventType } from '../../../../ui';
import { RoomObjectBadgeAssetEvent, RoomObjectWidgetRequestEvent } from '../../../events';
import { ObjectGroupBadgeUpdateMessage, ObjectSelectedMessage } from '../../../messages';
import { ObjectDataUpdateMessage } from '../../../messages/ObjectDataUpdateMessage';
import { StringDataType } from '../../data/type/StringDataType';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureGuildCustomizedLogic extends FurnitureMultiStateLogic
{
    public static GROUPID_KEY: number = 1;
    public static BADGE_KEY: number = 2;
    public static COLOR1_KEY: number = 3;
    public static COLOR2_KEY: number = 4;

    public getEventTypes(): string[]
    {
        const types = [
            RoomObjectBadgeAssetEvent.LOAD_BADGE,
            RoomObjectWidgetRequestEvent.GUILD_FURNI_CONTEXT_MENU,
            RoomObjectWidgetRequestEvent.CLOSE_FURNI_CONTEXT_MENU
        ];

        return this.mergeTypes(super.getEventTypes(), types);
    }

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

        else if(message instanceof ObjectGroupBadgeUpdateMessage)
        {
            if(message.assetName !== 'loading_icon')
            {
                this.object.model.setValue(RoomObjectVariable.FURNITURE_GUILD_CUSTOMIZED_ASSET_NAME, message.assetName);

                this.update(Nitro.instance.time);
            }
        }

        else if(message instanceof ObjectSelectedMessage)
        {
            if(!message.selected)
            {
                this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.CLOSE_FURNI_CONTEXT_MENU, this.object));
            }
        }
    }

    protected updateGroupId(id: string): void
    {
        this.object.model.setValue(RoomObjectVariable.FURNITURE_GUILD_CUSTOMIZED_GUILD_ID, parseInt(id));
    }

    private updateBadge(badge: string): void
    {
        this.eventDispatcher.dispatchEvent(new RoomObjectBadgeAssetEvent(RoomObjectBadgeAssetEvent.LOAD_BADGE, this.object, badge, true));
    }

    public updateColors(color1: string, color2: string): void
    {
        this.object.model.setValue(RoomObjectVariable.FURNITURE_GUILD_CUSTOMIZED_COLOR_1, parseInt(color1, 16));
        this.object.model.setValue(RoomObjectVariable.FURNITURE_GUILD_CUSTOMIZED_COLOR_2, parseInt(color2, 16));
    }

    public mouseEvent(event: RoomSpriteMouseEvent, geometry: IRoomGeometry): void
    {
        if(!event || !geometry || !this.object) return;

        switch(event.type)
        {
            case MouseEventType.MOUSE_CLICK:
                this.openContextMenu();
        }

        super.mouseEvent(event, geometry);
    }

    private openContextMenu(): void
    {
        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.GUILD_FURNI_CONTEXT_MENU, this.object));
    }
}
