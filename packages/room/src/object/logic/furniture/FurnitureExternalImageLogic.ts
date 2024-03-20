import { IAssetData, RoomObjectVariable } from '@nitrots/api';
import { RoomObjectWidgetRequestEvent } from '@nitrots/events';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureExternalImageLogic extends FurnitureMultiStateLogic
{
    public getEventTypes(): string[]
    {
        const types = [
            RoomObjectWidgetRequestEvent.EXTERNAL_IMAGE
        ];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public initialize(asset: IAssetData): void
    {
        super.initialize(asset);

        if(!asset) return;

        if(this.object && this.object.model)
        {
            let maskType = '';

            if(asset.logic)
            {
                if(asset.logic.maskType && (asset.logic.maskType !== '') && (asset.logic.maskType.length > 0)) maskType = asset.logic.maskType;
            }

            this.object.model.setValue(RoomObjectVariable.FURNITURE_USES_PLANE_MASK, 0);
            this.object.model.setValue(RoomObjectVariable.FURNITURE_PLANE_MASK_TYPE, maskType);
        }
    }

    public useObject(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.EXTERNAL_IMAGE, this.object));

        super.useObject();
    }
}
