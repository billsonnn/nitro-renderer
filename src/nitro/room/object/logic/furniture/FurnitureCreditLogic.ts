import { IAssetData } from '../../../../../core/asset/interfaces';
import { RoomObjectWidgetRequestEvent } from '../../../events/RoomObjectWidgetRequestEvent';
import { RoomObjectVariable } from '../../RoomObjectVariable';
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

        if(asset.credits && (asset.credits !== '') && (asset.credits.length > 0)) creditValue = parseInt(asset.credits);

        this.object.model.setValue(RoomObjectVariable.FURNITURE_CREDIT_VALUE, creditValue);
    }

    public useObject(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.CREDITFURNI, this.object));

        super.useObject();
    }
}
