import { ContextMenuEnum } from '../../../../../api';
import { RoomObjectWidgetRequestEvent } from '../../../../../events';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureEffectBoxLogic extends FurnitureLogic
{
    private _timer: any;

    public getEventTypes(): string[]
    {
        const types = [RoomObjectWidgetRequestEvent.EFFECTBOX_OPEN_DIALOG];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public useObject(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.EFFECTBOX_OPEN_DIALOG, this.object));
    }

    public get contextMenu(): string
    {
        return ContextMenuEnum.EFFECT_BOX;
    }
}
