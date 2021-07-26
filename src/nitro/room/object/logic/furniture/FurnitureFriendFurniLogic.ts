import { IAssetData } from '../../../../../core/asset/interfaces';
import { RoomObjectUpdateMessage } from '../../../../../room/messages/RoomObjectUpdateMessage';
import { ContextMenuEnum } from '../../../../ui';
import { RoomObjectWidgetRequestEvent } from '../../../events/RoomObjectWidgetRequestEvent';
import { ObjectDataUpdateMessage } from '../../../messages/ObjectDataUpdateMessage';
import { StringDataType } from '../../data/type/StringDataType';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureFriendFurniLogic extends FurnitureMultiStateLogic
{
    private static readonly STATE_UNINITIALIZED: number = -1;
    private static readonly STATE_UNLOCKED: number = 0;
    private static readonly STATE_LOCKED: number = 1;

    private _state: number = -1;

    public initialize(asset: IAssetData): void
    {
        super.initialize(asset);

        if(this.object) this.object.model.setValue(RoomObjectVariable.FURNITURE_FRIENDFURNI_ENGRAVING, this.engravingDialogType);
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        if(message instanceof ObjectDataUpdateMessage)
        {
            const data = (message.data as StringDataType);

            if(data)
            {
                this._state = data.state;
            }
            else
            {
                this._state = message.state;
            }
        }

        super.processUpdateMessage(message);
    }

    public getEventTypes(): string[]
    {
        const types = [ RoomObjectWidgetRequestEvent.FRIEND_FURNITURE_ENGRAVING ];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public useObject(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        if(this._state === FurnitureFriendFurniLogic.STATE_LOCKED)
        {
            this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.FRIEND_FURNITURE_ENGRAVING, this.object));
        }
        else
        {
            super.useObject();
        }
    }

    public get engravingDialogType(): number
    {
        return 0;
    }

    public get contextMenu(): string
    {
        return ((this._state === FurnitureFriendFurniLogic.STATE_UNLOCKED) ? ContextMenuEnum.FRIEND_FURNITURE : ContextMenuEnum.DUMMY);
    }
}
