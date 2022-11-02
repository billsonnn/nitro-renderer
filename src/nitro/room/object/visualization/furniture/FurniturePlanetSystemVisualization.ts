import { IAssetLogicPlanetSystem, RoomObjectVariable, Vector3d } from '../../../../../api';
import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';
import { FurniturePlanetSystemVisualizationPlanetObject } from './FurniturePlanetSystemVisualizationPlanetObject';

export class FurniturePlanetSystemVisualization extends FurnitureAnimatedVisualization
{
    private _planetIndex: FurniturePlanetSystemVisualizationPlanetObject[];
    private _planetNameIndex: string[];
    private _offsetArray: Vector3d[];
    private _rootPosition: Vector3d;

    constructor()
    {
        super();

        this._offsetArray = [];
        this._rootPosition = new Vector3d();
    }

    public dispose(): void
    {
        if(this._planetIndex)
        {
            while(this._planetIndex.length > 0)
            {
                const planet = this._planetIndex.shift();

                planet.dispose();
            }
        }

        this._planetIndex = null;
        this._planetNameIndex = null;
    }

    protected updateAnimation(scale: number): number
    {
        if(!this._planetIndex && (this.spriteCount > 0))
        {
            if(!this.processPlanets()) return 0;
        }

        if(this._planetIndex)
        {
            for(const planet of this._planetIndex) planet.update(this._offsetArray, this._rootPosition, scale);

            return super.updateAnimation(scale);
        }

        return 0;
    }

    protected getLayerXOffset(scale: number, direction: number, layerId: number): number
    {
        if(this._offsetArray[layerId])
        {
            return this._offsetArray[layerId].x;
        }

        return super.getLayerXOffset(scale, direction, layerId);
    }

    protected getLayerYOffset(scale: number, direction: number, layerId: number): number
    {
        if(this._offsetArray[layerId])
        {
            return this._offsetArray[layerId].y;
        }

        return super.getLayerYOffset(scale, direction, layerId);
    }

    protected getLayerZOffset(scale: number, direction: number, layerId: number): number
    {
        if(this._offsetArray[layerId])
        {
            return this._offsetArray[layerId].z;
        }

        return super.getLayerZOffset(scale, direction, layerId);
    }

    private processPlanets(): boolean
    {
        if(!this.object || !this.object.model) return;

        const planetSystems = this.object.model.getValue<IAssetLogicPlanetSystem[]>(RoomObjectVariable.FURNITURE_PLANETSYSTEM_DATA);

        if(!planetSystems) return false;

        this._planetIndex = [];
        this._planetNameIndex = [];

        for(const planet of planetSystems)
        {
            const sprite = this.getSprite(planet.id);

            if(sprite)
            {
                this.addPlanet(planet.name, planet.id, planet.parent, (planet.radius || 0), (planet.arcSpeed || 0), (planet.arcOffset || 0), (planet.height || 0));
            }
        }

        return true;
    }

    private addPlanet(name: string, index: number, parentName: string, radius: number, arcSpeed: number, arcOffset: number, height: number): void
    {
        if(!this._planetIndex) return;

        const planet = new FurniturePlanetSystemVisualizationPlanetObject(name, index, radius, arcSpeed, arcOffset, height);
        const existingPlanet = this.getPlanet(parentName);

        if(existingPlanet) existingPlanet.addChild(planet);
        else
        {
            this._planetIndex.push(planet);
            this._planetNameIndex.push(name);
        }
    }

    private getPlanet(name: string): FurniturePlanetSystemVisualizationPlanetObject
    {
        for(const planet of this._planetIndex)
        {
            if(planet.name === name) return planet;

            if(planet.hasChild(name)) return planet.getChild(name);
        }

        return null;
    }
}
