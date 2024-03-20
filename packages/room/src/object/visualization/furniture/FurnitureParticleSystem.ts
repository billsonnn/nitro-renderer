import { IAdvancedMap, IGraphicAsset, IParticleSystem, IRoomObjectSprite } from '@nitrots/api';
import { AdvancedMap, TextureUtils, Vector3d } from '@nitrots/utils';
import { AlphaFilter, Graphics, Matrix, Point, Sprite, Texture } from 'pixi.js';
import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';
import { FurnitureParticleSystemEmitter } from './FurnitureParticleSystemEmitter';

export class FurnitureParticleSystem
{
    private _emitters: IAdvancedMap<number, FurnitureParticleSystemEmitter>;
    private _visualization: FurnitureAnimatedVisualization;
    private _size: number;
    private _canvasId: number = -1;
    private _offsetY: number;
    private _currentEmitter: FurnitureParticleSystemEmitter;
    private _canvasTexture: Texture;
    private _roomSprite: IRoomObjectSprite;
    private _hasIgnited: boolean = false;
    private _centerX: number = 0;
    private _centerY: number = 0;
    private _scaleMultiplier: number = 1;
    private _blackOverlay: Graphics;
    private _blackOverlayAlphaTransform: AlphaFilter;
    private _particleColorTransform: AlphaFilter;
    private _identityMatrix: Matrix;
    private _translationMatrix: Matrix;
    private _blend: number = 1;
    private _bgColor: number = 0xFF000000;
    private _emptySprite: Sprite;
    private _isDone: boolean = false;

    constructor(visualization: FurnitureAnimatedVisualization)
    {
        this._emitters = new AdvancedMap();
        this._visualization = visualization;
        this._blackOverlayAlphaTransform = new AlphaFilter();
        this._blackOverlayAlphaTransform.alpha = 1;
        this._particleColorTransform = new AlphaFilter();
        this._identityMatrix = new Matrix();
        this._translationMatrix = new Matrix();
    }

    public dispose(): void
    {
        for(const emitter of this._emitters.getValues()) emitter.dispose();

        this._emitters = null;

        if(this._canvasTexture)
        {
            this._canvasTexture.destroy();
            this._canvasTexture = null;
        }

        if(this._blackOverlay)
        {
            this._blackOverlay.destroy();
            this._blackOverlay = null;
        }

        if(this._emptySprite)
        {
            this._emptySprite.destroy();
            this._emptySprite = null;
        }

        this._blackOverlayAlphaTransform = null;
        this._particleColorTransform = null;
        this._identityMatrix = null;
        this._translationMatrix = null;
    }

    public reset(): void
    {
        if(this._currentEmitter) this._currentEmitter.reset();

        this._currentEmitter = null;
        this._hasIgnited = false;
        this._isDone = false;

        this.updateCanvas();
    }

    public setAnimation(id: number): void
    {
        if(this._currentEmitter) this._currentEmitter.reset();

        this._currentEmitter = this._emitters.getValue(id);
        this._hasIgnited = false;
        this._isDone = false;

        this.updateCanvas();
    }

    private updateCanvas(): void
    {
        if(!this._currentEmitter || (this._canvasId === -1)) return;

        this._roomSprite = this._visualization.getSprite(this._canvasId);

        if(this._roomSprite && this._roomSprite.texture)
        {
            if((this._roomSprite.width <= 1) || (this._roomSprite.height <= 1)) return;

            if(this._canvasTexture && ((this._canvasTexture.width !== this._roomSprite.width) || (this._canvasTexture.height !== this._roomSprite.height))) this._canvasTexture = null;

            this.clearCanvas();

            this._centerX = -(this._roomSprite.offsetX);
            this._centerY = -(this._roomSprite.offsetY);
            this._roomSprite.texture = this._canvasTexture;
        }
    }

    public getLayerYOffset(scale: number, direction: number, layerId: number): number
    {
        if(this._currentEmitter && (this._currentEmitter.roomObjectSpriteId === layerId))
        {
            return this._currentEmitter.y * this._scaleMultiplier;
        }

        return 0;
    }

    public controlsSprite(k: number): boolean
    {
        if(this._currentEmitter) return this._currentEmitter.roomObjectSpriteId == k;

        return false;
    }

    public updateSprites(): void
    {
        if(!this._currentEmitter || !this._roomSprite) return;

        if(this._canvasTexture && (this._roomSprite.texture !== this._canvasTexture))
        {
            this._roomSprite.texture = this._canvasTexture;
        }

        if(this._hasIgnited)
        {
            if(this._currentEmitter.roomObjectSpriteId >= 0) this._visualization.getSprite(this._currentEmitter.roomObjectSpriteId).visible = false;
        }
    }

    public updateAnimation(): void
    {
        if(!this._currentEmitter || !this._roomSprite || this._isDone) return;

        const k = 10;

        if(!this._hasIgnited && this._currentEmitter.hasIgnited) this._hasIgnited = true;

        const offsetY = (this._offsetY * this._scaleMultiplier);

        this._currentEmitter.update();

        if(this._hasIgnited)
        {
            if(this._currentEmitter.roomObjectSpriteId >= 0)
            {
                this._visualization.getSprite(this._currentEmitter.roomObjectSpriteId).visible = false;
            }

            if(!this._canvasTexture) this.updateCanvas();

            this.clearCanvas();

            for(const particle of this._currentEmitter.particles)
            {
                const tx = (this._centerX + ((((particle.x - particle.z) * k) / 10) * this._scaleMultiplier));
                const ty = ((this._centerY - offsetY) + ((((particle.y + ((particle.x + particle.z) / 2)) * k) / 10) * this._scaleMultiplier));
                const asset = particle.getAsset();

                if(asset && asset.texture)
                {
                    if(particle.fade && (particle.alphaMultiplier < 1))
                    {
                        this._translationMatrix.identity();
                        this._translationMatrix.translate((tx + asset.offsetX), (ty + asset.offsetY));

                        const sprite = new Sprite(asset.texture);

                        this._particleColorTransform.alpha = particle.alphaMultiplier;

                        sprite.filters = [this._particleColorTransform];

                        TextureUtils.writeToTexture(sprite, this._canvasTexture, false, this._translationMatrix);
                    }
                    else
                    {
                        const point = new Point((tx + asset.offsetX), (ty + asset.offsetY));
                        const sprite = new Sprite(asset.texture);

                        sprite.x = point.x;
                        sprite.y = point.y;

                        TextureUtils.writeToTexture(sprite, this._canvasTexture, false);
                    }
                }
                else
                {
                    const sprite = new Sprite(Texture.WHITE);

                    sprite.tint = 0xFFFFFF;
                    sprite.x = (tx - 1);
                    sprite.y = (ty - 1);
                    sprite.width = 2;
                    sprite.height = 2;

                    TextureUtils.writeToTexture(sprite, this._canvasTexture, false);
                }
            }

            if(!this._currentEmitter.particles.length)
            {
                this._isDone = true;

                return;
            }
        }
    }

    public parseData(particleSystem: IParticleSystem): void
    {
        this._size = particleSystem.size;
        this._canvasId = ((particleSystem.canvasId !== undefined) ? particleSystem.canvasId : -1);
        this._offsetY = ((particleSystem.offsetY !== undefined) ? particleSystem.offsetY : 10);
        this._scaleMultiplier = (this._size / 64);
        this._blend = ((particleSystem.blend !== undefined) ? particleSystem.blend : 1);
        this._blend = Math.min(this._blend, 1);

        this._blackOverlayAlphaTransform.alpha = this._blend;

        const bgColor = ((particleSystem.bgColor !== undefined) ? particleSystem.bgColor : '0');

        this._bgColor = (parseInt(bgColor, 16) || 0x000000);

        if(!particleSystem.emitters || !particleSystem.emitters.length) return;

        for(const emitter of particleSystem.emitters)
        {
            const emitterId = emitter.id;
            const emitterName = emitter.name;
            const emitterSpriteId = emitter.spriteId;

            const particleEmitter = new FurnitureParticleSystemEmitter(emitterName, emitterSpriteId);

            this._emitters.add(emitterId, particleEmitter);

            const maxNumParticles = emitter.maxNumParticles;
            const particlesPerFrame = emitter.particlesPerFrame;
            const burstPulse = ((emitter.burstPulse !== undefined) ? emitter.burstPulse : 1);
            const fuseTime = emitter.fuseTime;
            const simulationForce = emitter.simulation.force;
            const simulationDirection = emitter.simulation.direction;
            const simulationGravity = emitter.simulation.gravity;
            const simulationAirFriction = emitter.simulation.airFriction;
            const simulationShape = emitter.simulation.shape;
            const simulationEnergy = emitter.simulation.energy;

            for(const particle of emitter.particles)
            {
                const lifeTime = particle.lifeTime;
                const isEmitter = (particle.isEmitter || false);
                const fade = (particle.fade || false);

                const frames: IGraphicAsset[] = [];

                for(const name of particle.frames) frames.push(this._visualization.asset.getAsset(name));

                particleEmitter.configureParticle(lifeTime, isEmitter, frames, fade);
            }

            particleEmitter.setup(maxNumParticles, particlesPerFrame, simulationForce, new Vector3d(0, simulationDirection, 0), simulationGravity, simulationAirFriction, simulationShape, simulationEnergy, fuseTime, burstPulse);
        }
    }

    public copyStateFrom(particleSystem: FurnitureParticleSystem): void
    {
        let emitterId = 0;

        if(particleSystem._emitters && particleSystem._currentEmitter)
        {
            emitterId = particleSystem._emitters.getKey(particleSystem._emitters.getValues().indexOf(particleSystem._currentEmitter));
        }

        this.setAnimation(emitterId);

        if(this._currentEmitter) this._currentEmitter.copyStateFrom(particleSystem._currentEmitter, (particleSystem._size / this._size));

        this._canvasTexture = null;
    }

    private clearCanvas(): void
    {
        if(!this._emptySprite)
        {
            this._emptySprite = new Sprite(Texture.EMPTY);

            this._emptySprite.alpha = 0;
        }

        if(!this._canvasTexture)
        {
            this._canvasTexture = TextureUtils.createRenderTexture(this._roomSprite.width, this._roomSprite.height);
        }
        else
        {
            TextureUtils.writeToTexture(this._emptySprite, this._canvasTexture, true);
        }
    }
}
