import { IAssetData } from '../../../../../core/asset/interfaces';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureWindowLogic extends FurnitureMultiStateLogic
{
    public initialize(asset: IAssetData): void
    {
        super.initialize(asset);

        let maskType = '';

        if(asset.maskType && (asset.maskType !== '') && (asset.maskType.length > 0)) maskType = asset.maskType;

        this.object.model.setValue(RoomObjectVariable.FURNITURE_USES_PLANE_MASK, 0);
        this.object.model.setValue(RoomObjectVariable.FURNITURE_PLANE_MASK_TYPE, maskType);
    }
}