import { IAssetData, IPlanetSystem } from '../../../../../core/asset/interfaces';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { FurnitureLogic } from './FurnitureLogic';

export class FurniturePlanetSystemLogic extends FurnitureLogic
{
    public initialize(asset: IAssetData): void
    {
        super.initialize(asset);

        if(asset.planetSystem)
        {
            this.object.model.setValue<IPlanetSystem>(RoomObjectVariable.FURNITURE_PLANETSYSTEM_DATA, asset.planetSystem);
        }
    }
}
