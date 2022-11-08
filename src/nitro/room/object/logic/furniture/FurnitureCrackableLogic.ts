import { RoomObjectVariable, RoomWidgetEnumItemExtradataParameter } from '../../../../../api';
import { RoomObjectUpdateMessage } from '../../../../../room';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureCrackableLogic extends FurnitureLogic
{
    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        super.processUpdateMessage(message);

        if(!this.object) return;

        if(this.object.model.getValue(RoomObjectVariable.FURNITURE_REAL_ROOM_OBJECT) === 1)
        {
            this.object.model.setValue(RoomWidgetEnumItemExtradataParameter.INFOSTAND_EXTRA_PARAM, RoomWidgetEnumItemExtradataParameter.CRACKABLE_FURNI);
        }
    }
}
