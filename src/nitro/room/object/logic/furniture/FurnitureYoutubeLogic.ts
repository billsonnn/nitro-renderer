import { RoomWidgetEnum } from '../../../../ui/widget/enums/RoomWidgetEnum';
import { RoomObjectDataRequestEvent } from '../../../events/RoomObjectDataRequestEvent';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureYoutubeLogic extends FurnitureLogic
{
    public getEventTypes(): string[]
    {
        const types = [
            RoomObjectDataRequestEvent.RODRE_URL_PREFIX
        ];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public update(time: number): void
    {
        super.update(time);

        if(!this.object.model.getValue<string>(RoomObjectVariable.SESSION_URL_PREFIX))
        {
            this.eventDispatcher.dispatchEvent(new RoomObjectDataRequestEvent(RoomObjectDataRequestEvent.RODRE_URL_PREFIX, this.object));
        }
    }

    public get widget(): string
    {
        return RoomWidgetEnum.YOUTUBE;
    }
}
