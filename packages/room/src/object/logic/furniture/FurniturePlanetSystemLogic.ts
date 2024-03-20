import { IAssetData, IAssetLogicPlanetSystem, RoomObjectVariable } from '@nitrots/api';
import { FurnitureLogic } from './FurnitureLogic';

export class FurniturePlanetSystemLogic extends FurnitureLogic
{
    public initialize(asset: IAssetData): void
    {
        super.initialize(asset);

        if(asset.logic)
        {
            if(asset.logic.planetSystems)
            {
                this.object.model.setValue<IAssetLogicPlanetSystem[]>(RoomObjectVariable.FURNITURE_PLANETSYSTEM_DATA, asset.logic.planetSystems);
            }
        }
    }
}
