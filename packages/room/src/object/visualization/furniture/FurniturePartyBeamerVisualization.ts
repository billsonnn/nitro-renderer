import { Point } from 'pixi.js';
import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

export class FurniturePartyBeamerVisualization extends FurnitureAnimatedVisualization
{
    private static UPDATE_INTERVAL: number = 2;
    private static AREA_DIAMETER_SMALL: number = 15;
    private static AREA_DIAMETER_LARGE: number = 31;
    private static ANIM_SPEED_FAST: number = 2;
    private static ANIM_SPEED_SLOW: number = 1;

    private _animPhaseIndex: number[];
    private _animDirectionIndex: number[];
    private _animSpeedIndex: number[];
    private _animFactorIndex: number[];
    private _animOffsetIndex: Point[];

    constructor()
    {
        super();

        this._animOffsetIndex = [];
    }

    protected updateAnimation(scale: number): number
    {
        if(!this._animSpeedIndex) this.initItems(scale);

        let sprite = this.getSprite(2);

        if(sprite) this._animOffsetIndex[0] = this.getNewPoint(scale, 0);

        sprite = this.getSprite(3);

        if(sprite) this._animOffsetIndex[1] = this.getNewPoint(scale, 1);

        return super.updateAnimation(scale);
    }

    private getNewPoint(scale: number, layerId: number): Point
    {
        let diameter = 0;

        let animationPhase: number = this._animPhaseIndex[layerId];
        let animationDirection: number = this._animDirectionIndex[layerId];

        const animationSpeed: number = this._animSpeedIndex[layerId];
        const animationFactor: number = this._animFactorIndex[layerId];

        let _local_7 = 1;

        if(scale == 32)
        {
            diameter = FurniturePartyBeamerVisualization.AREA_DIAMETER_SMALL;
            _local_7 = 0.5;
        }
        else
        {
            diameter = FurniturePartyBeamerVisualization.AREA_DIAMETER_LARGE;
        }

        const _local_9: number = (animationPhase + (animationDirection * animationSpeed));

        if(Math.abs(_local_9) >= diameter)
        {
            if(animationDirection > 0)
            {
                animationPhase = (animationPhase - (_local_9 - diameter));
            }
            else
            {
                animationPhase = (animationPhase + (-(diameter) - _local_9));
            }

            animationDirection = -(animationDirection);

            this._animDirectionIndex[layerId] = animationDirection;
        }

        const _local_10: number = ((diameter - Math.abs(animationPhase)) * animationFactor);

        let _local_11: number = ((animationDirection * Math.sin(Math.abs((animationPhase / 4)))) * _local_10);

        if(animationDirection > 0)
        {
            _local_11 = (_local_11 - _local_10);
        }
        else
        {
            _local_11 = (_local_11 + _local_10);
        }

        animationPhase = (animationPhase + ((animationDirection * animationSpeed) * _local_7));

        this._animPhaseIndex[layerId] = animationPhase;

        if(Math.trunc(_local_11) == 0) this._animFactorIndex[layerId] = this.getRandomAmplitudeFactor();

        return new Point(animationPhase, _local_11);
    }

    private initItems(scale: number): void
    {
        let diameter: number;

        if(scale === 32)
        {
            diameter = FurniturePartyBeamerVisualization.AREA_DIAMETER_SMALL;
        }
        else
        {
            diameter = FurniturePartyBeamerVisualization.AREA_DIAMETER_LARGE;
        }

        this._animPhaseIndex = [];
        this._animPhaseIndex.push(((Math.random() * diameter) * 1.5));
        this._animPhaseIndex.push(((Math.random() * diameter) * 1.5));

        this._animDirectionIndex = [];
        this._animDirectionIndex.push(1);
        this._animDirectionIndex.push(-1);

        this._animSpeedIndex = [];
        this._animSpeedIndex.push(FurniturePartyBeamerVisualization.ANIM_SPEED_FAST);
        this._animSpeedIndex.push(FurniturePartyBeamerVisualization.ANIM_SPEED_SLOW);

        this._animFactorIndex = [];
        this._animFactorIndex.push(this.getRandomAmplitudeFactor());
        this._animFactorIndex.push(this.getRandomAmplitudeFactor());
    }

    protected getLayerXOffset(scale: number, direction: number, layerId: number): number
    {
        if((layerId === 2) || (layerId === 3))
        {
            if(this._animOffsetIndex.length == 2)
            {
                return this._animOffsetIndex[(layerId - 2)].x;
            }
        }
        return super.getLayerXOffset(scale, direction, layerId);
    }

    protected getLayerYOffset(scale: number, direction: number, layerId: number): number
    {
        if((layerId === 2) || (layerId === 3))
        {
            if(this._animOffsetIndex.length == 2)
            {
                return this._animOffsetIndex[(layerId - 2)].y;
            }
        }
        return super.getLayerYOffset(scale, direction, layerId);
    }

    private getRandomAmplitudeFactor(): number
    {
        return ((Math.random() * 30) / 100) + 0.15;
    }
}
