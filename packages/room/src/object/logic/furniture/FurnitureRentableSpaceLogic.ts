import { RoomObjectVariable, RoomWidgetEnum } from '@nitrots/api';
import { RoomObjectDataRequestEvent } from '@nitrots/events';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureRentableSpaceLogic extends FurnitureLogic
{
    public getEventTypes(): string[]
    {
        const types = [
            RoomObjectDataRequestEvent.RODRE_CURRENT_USER_ID,
        ];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public update(time: number): void
    {
        super.update(time);

        if(this.object && this.object.model)
        {
            if(!this.object.model.getValue<number>(RoomObjectVariable.SESSION_CURRENT_USER_ID))
            {
                this.eventDispatcher.dispatchEvent(new RoomObjectDataRequestEvent(RoomObjectDataRequestEvent.RODRE_CURRENT_USER_ID, this.object));
            }

            const renterId = this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_DATA)['renterId'];
            const userId = this.object.model.getValue<number>(RoomObjectVariable.SESSION_CURRENT_USER_ID);

            if(renterId)
            {
                if(parseInt(renterId) === userId) this.object.setState(2, 0);
                else this.object.setState(1, 0);
            }
            else
            {
                this.object.setState(0, 0);
            }
        }
    }

    public get widget(): string
    {
        return RoomWidgetEnum.RENTABLESPACE;
    }
}
