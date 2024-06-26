import { IAdvancedMap, IParticleSystem, RoomObjectVariable } from '@nitrots/api';
import { AdvancedMap, NitroLogger } from '@nitrots/utils';
import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';
import { FurnitureParticleSystem } from './FurnitureParticleSystem';

export class FurnitureFireworksVisualization extends FurnitureAnimatedVisualization
{
    private _particleSystems: IAdvancedMap<number, FurnitureParticleSystem>;
    private _currentParticleSystem: FurnitureParticleSystem;

    public dispose(): void
    {
        super.dispose();

        this._currentParticleSystem = null;

        if(this._particleSystems)
        {
            for(const particleSystem of this._particleSystems.getValues()) particleSystem.dispose();

            this._particleSystems = null;
        }
    }

    protected updateObject(scale: number, direction: number): boolean
    {
        if(super.updateObject(scale, direction))
        {
            if(!this._particleSystems)
            {
                this.readDefinition();

                if(this._particleSystems) this._currentParticleSystem = this._particleSystems.getValue(scale);

                else NitroLogger.log('ERROR Particle systems could not be read!', this.object.type);
            }
            else
            {
                if((scale !== this._scale) || (this._particleSystems.getValue(scale) !== this._currentParticleSystem))
                {
                    const particleSystem = this._particleSystems.getValue(scale);

                    if(!particleSystem) return false;

                    particleSystem.copyStateFrom(this._currentParticleSystem);

                    if(this._currentParticleSystem) this._currentParticleSystem.reset();

                    this._currentParticleSystem = particleSystem;
                }
            }

            return true;
        }

        return false;
    }

    protected updateSprites(scale: number, update: boolean, animation: number): void
    {
        super.updateSprites(scale, update, animation);

        if(this._currentParticleSystem) this._currentParticleSystem.updateSprites();
    }

    protected updateAnimation(scale: number): number
    {
        if(this._currentParticleSystem) this._currentParticleSystem.updateAnimation();

        return super.updateAnimation(scale);
    }

    protected setAnimation(id: number): void
    {
        if(this._currentParticleSystem) this._currentParticleSystem.setAnimation(id);

        super.setAnimation(id);
    }

    protected getLayerYOffset(scale: number, direction: number, layerId: number): number
    {
        if(this._currentParticleSystem && this._currentParticleSystem.controlsSprite(layerId))
        {
            return this._currentParticleSystem.getLayerYOffset(scale, direction, layerId);
        }

        return super.getLayerYOffset(scale, direction, layerId);
    }

    private readDefinition(): boolean
    {
        if(!this.object || !this.object.model) return false;

        const fireworksData = this.object.model.getValue<IParticleSystem[]>(RoomObjectVariable.FURNITURE_FIREWORKS_DATA);

        if(!fireworksData || !fireworksData.length) return false;

        this._particleSystems = new AdvancedMap();

        for(const particleData of fireworksData)
        {
            const size = particleData.size;
            const particleSystem = new FurnitureParticleSystem(this);

            particleSystem.parseData(particleData);

            this._particleSystems.add(size, particleSystem);
        }

        return true;
    }
}
