import { IAssetData } from '../../../../../core/asset/interfaces';
import { RoomObjectUpdateMessage } from '../../../../../room/messages/RoomObjectUpdateMessage';
import { RoomObjectLogicBase } from '../../../../../room/object/logic/RoomObjectLogicBase';
import { ObjectVisibilityUpdateMessage } from '../../../messages/ObjectVisibilityUpdateMessage';
import { RoomObjectVariable } from '../../RoomObjectVariable';

export class SelectionArrowLogic extends RoomObjectLogicBase
{
    public initialize(data: IAssetData): void
    {
        if(!this.object) return;

        this.object.model.setValue(RoomObjectVariable.FURNITURE_ALPHA_MULTIPLIER, 1);

        this.object.setState(1, 0);
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        super.processUpdateMessage(message);

        if(!(message instanceof ObjectVisibilityUpdateMessage)) return;

        if(this.object)
        {
            switch(message.type)
            {
                case ObjectVisibilityUpdateMessage.ENABLED:
                    this.object.setState(0, 0);
                    return;
                case ObjectVisibilityUpdateMessage.DISABLED:
                    this.object.setState(1, 0);
                    return;
            }
        }
    }
}