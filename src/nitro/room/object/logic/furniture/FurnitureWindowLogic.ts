import { IAssetData, RoomObjectVariable } from '../../../../../api';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureWindowLogic extends FurnitureMultiStateLogic
{
    public initialize(asset: IAssetData): void
    {
        super.initialize(asset);

        let maskType = '';

        if(asset.logic)
        {
            if(asset.logic.maskType && (asset.logic.maskType !== '') && (asset.logic.maskType.length > 0)) maskType = asset.logic.maskType;
        }

        this.object.model.setValue(RoomObjectVariable.FURNITURE_USES_PLANE_MASK, 1);
        this.object.model.setValue(RoomObjectVariable.FURNITURE_PLANE_MASK_TYPE, maskType);
    }
}
