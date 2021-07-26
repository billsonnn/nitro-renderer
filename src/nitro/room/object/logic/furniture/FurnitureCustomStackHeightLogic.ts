import { IAssetData } from '../../../../../core/asset/interfaces';
import { RoomWidgetEnum } from '../../../../ui';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureCustomStackHeightLogic extends FurnitureMultiStateLogic
{
    public initialize(asset: IAssetData): void
    {
        super.initialize(asset);

        if(this.object && this.object.model) this.object.model.setValue(RoomObjectVariable.FURNITURE_ALWAYS_STACKABLE, 1);
    }

    public get widget(): string
    {
        return RoomWidgetEnum.CUSTOM_STACK_HEIGHT;
    }
}
