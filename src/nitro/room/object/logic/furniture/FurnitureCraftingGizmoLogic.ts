import { RoomWidgetEnum } from '../../../../../api';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureCraftingGizmoLogic extends FurnitureLogic
{
    public get widget(): string
    {
        return RoomWidgetEnum.CRAFTING;
    }
}
