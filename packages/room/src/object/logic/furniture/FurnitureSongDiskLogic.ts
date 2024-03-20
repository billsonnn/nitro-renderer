import { RoomObjectVariable, RoomWidgetEnumItemExtradataParameter } from '@nitrots/api';
import { RoomObjectUpdateMessage } from '../../../messages';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureSongDiskLogic extends FurnitureLogic
{
    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        super.processUpdateMessage(message);

        if(this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_REAL_ROOM_OBJECT) === 1)
        {
            const extras = this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_EXTRAS);
            const diskId = parseInt(extras);

            this.object.model.setValue<string>(RoomWidgetEnumItemExtradataParameter.INFOSTAND_EXTRA_PARAM, (RoomWidgetEnumItemExtradataParameter.SONGDISK + diskId));
        }
    }
}
