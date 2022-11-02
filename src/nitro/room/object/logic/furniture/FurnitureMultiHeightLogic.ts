import { IAssetData, RoomObjectVariable } from '../../../../../api';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureMultiHeightLogic extends FurnitureMultiStateLogic
{
    public initialize(asset: IAssetData): void
    {
        super.initialize(asset);

        if(this.object && this.object.model) this.object.model.setValue(RoomObjectVariable.FURNITURE_IS_VARIABLE_HEIGHT, 1);
    }
}
