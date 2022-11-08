import { IAssetData, RoomObjectVariable } from '../../../../../api';
import { RoomObjectWidgetRequestEvent } from '../../../../../events';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureCreditLogic extends FurnitureLogic
{
    public getEventTypes(): string[]
    {
        const types = [
            RoomObjectWidgetRequestEvent.CREDITFURNI
        ];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public initialize(asset: IAssetData): void
    {
        super.initialize(asset);

        let creditValue = 0;

        if(asset.logic)
        {
            if(asset.logic.credits && (asset.logic.credits !== '') && (asset.logic.credits.length > 0)) creditValue = parseInt(asset.logic.credits);
        }

        this.object.model.setValue(RoomObjectVariable.FURNITURE_CREDIT_VALUE, creditValue);
    }

    public useObject(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.CREDITFURNI, this.object));

        super.useObject();
    }
}
