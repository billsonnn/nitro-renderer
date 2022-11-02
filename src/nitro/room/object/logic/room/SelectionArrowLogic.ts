import { IAssetData, RoomObjectVariable } from '../../../../../api';
import { RoomObjectLogicBase, RoomObjectUpdateMessage } from '../../../../../room';
import { ObjectVisibilityUpdateMessage } from '../../../messages';

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
