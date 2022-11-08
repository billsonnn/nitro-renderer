import { RoomObjectVariable } from '../../../../../api';
import { RoomObjectWidgetRequestEvent } from '../../../../../events';
import { RoomObjectUpdateMessage } from '../../../../../room';
import { ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureHighScoreLogic extends FurnitureLogic
{
    private static SHOW_WIDGET_IN_STATE = 1;

    private _state = -1;

    public getEventTypes(): string[]
    {
        return [RoomObjectWidgetRequestEvent.HIGH_SCORE_DISPLAY, RoomObjectWidgetRequestEvent.HIDE_HIGH_SCORE_DISPLAY];
    }

    public tearDown(): void
    {
        if(this.object.model.getValue(RoomObjectVariable.FURNITURE_REAL_ROOM_OBJECT) === 1)
        {
            this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.HIDE_HIGH_SCORE_DISPLAY, this.object));
        }

        super.tearDown();
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        super.processUpdateMessage(message);

        if(this.object.model.getValue(RoomObjectVariable.FURNITURE_REAL_ROOM_OBJECT) !== 1) return;

        if(message instanceof ObjectDataUpdateMessage)
        {
            if(message.state === FurnitureHighScoreLogic.SHOW_WIDGET_IN_STATE)
            {
                this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.HIGH_SCORE_DISPLAY, this.object));
            }
            else
            {
                this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.HIDE_HIGH_SCORE_DISPLAY, this.object));
            }

            this._state = message.state;
        }
    }
}
