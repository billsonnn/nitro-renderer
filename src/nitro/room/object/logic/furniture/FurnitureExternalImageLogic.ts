import { IAssetData } from '../../../../../core/asset/interfaces';
import { RoomWidgetEnum } from '../../../../ui/widget/enums/RoomWidgetEnum';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureExternalImageLogic extends FurnitureMultiStateLogic
{
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

    public get widget(): string
    {
        return RoomWidgetEnum.EXTERNAL_IMAGE;
    }
}
