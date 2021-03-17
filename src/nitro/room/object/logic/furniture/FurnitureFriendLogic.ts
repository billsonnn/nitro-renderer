import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';
import { RoomObjectBadgeAssetEvent } from '../../../events/RoomObjectBadgeAssetEvent';
import { RoomObjectWidgetRequestEvent } from '../../../events/RoomObjectWidgetRequestEvent';
import { IAssetData } from '../../../../../core/asset/interfaces';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { RoomObjectUpdateMessage } from '../../../../../room/messages/RoomObjectUpdateMessage';
import { ObjectDataUpdateMessage } from '../../../messages/ObjectDataUpdateMessage';
import { StringDataType } from '../../data/type/StringDataType';

export class FurnitureFriendLogic extends FurnitureMultiStateLogic
{
    private static readonly STATE_UNINITIALIZED: number = -1;
    private static readonly STATE_UNLOCKED: number = 0;
    private static readonly STATE_LOCKED: number = 1;

    private _state: number = -1;

    public get engravingDialogType(): number
    {
        return 0;
    }

    public initialize(asset: IAssetData): void
    {
        super.initialize(asset);
        if(this.object) this.object.model.setValue(RoomObjectVariable.FURNITURE_FRIENDFURNI_ENGRAVING, this.engravingDialogType);
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        // chheck if not ObjectSelectedMessage
        const dataMessage = <ObjectDataUpdateMessage>message;
        if(message instanceof ObjectDataUpdateMessage)
        {
            const local4 = <StringDataType>dataMessage.data;
            if(local4)
            {
                this._state = local4.state;
            }
            else
            {
                this._state =dataMessage.state;
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
        if(this._state == FurnitureFriendLogic.STATE_LOCKED)
        {
            (this.object && this.eventDispatcher && this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.FRIEND_FURNITURE_ENGRAVING, this.object)));
        }
        else
        {
            super.useObject();
        }

    }
}


