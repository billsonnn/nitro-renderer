import { Resource, Texture } from '@pixi/core';
import { AvatarAction, IRoomObjectSprite } from '../../../../../../api';
import { AvatarVisualization } from '../AvatarVisualization';
import { IAvatarAddition } from './IAvatarAddition';

export class NumberBubbleAddition implements IAvatarAddition
{
    private _id: number;
    private _visualization: AvatarVisualization;
    private _asset: Texture<Resource>;
    private _scale: number;
    private _number: number;
    private _numberValueFadeDirection: number;
    private _numberValueMoving: boolean;
    private _numberValueMoveCounter: number;

    constructor(id: number, number: number, visualization: AvatarVisualization)
    {
        this._id = id;
        this._visualization = visualization;
        this._asset = null;
        this._scale = 0;
        this._number = number;
        this._numberValueFadeDirection = 0;
        this._numberValueMoving = false;
        this._numberValueMoveCounter = 0;
    }

    public dispose(): void
    {
        this._visualization = null;
        this._asset = null;
    }

    public update(sprite: IRoomObjectSprite, scale: number): void
    {
        if(!sprite) return;

        this._scale = scale;

        let additionScale = 64;
        let offsetX = 0;
        let offsetY = 0;

        if(this._number > 0)
        {
            if(scale < 48)
            {
                this._asset = this._visualization.getAvatarRenderAsset('avatar_addition_number_' + this._number + '_small');

                additionScale = 32;
                offsetX = -6;
                offsetY = -52;
            }
            else
            {
                this._asset = this._visualization.getAvatarRenderAsset('avatar_addition_number_' + this._number);

                offsetX = -8;
                offsetY = -105;
            }

            if(this._visualization.posture === AvatarAction.POSTURE_SIT)
            {
                offsetY += (additionScale / 2);
            }

            else if(this._visualization.posture === AvatarAction.POSTURE_LAY)
            {
                offsetY += scale;
            }

            if(this._asset)
            {
                sprite.visible = true;
                sprite.texture = this._asset;
                sprite.offsetX = offsetX;
                sprite.offsetY = offsetY;
                sprite.relativeDepth = -0.01;
                sprite.alpha = 0;

                this._numberValueFadeDirection = 1;
                this._numberValueMoving = true;
                this._numberValueMoveCounter = 0;
            }
            else
            {
                sprite.visible = false;
            }
        }
        else
        {
            if(sprite.visible) this._numberValueFadeDirection = -1;
        }
    }

    public animate(sprite: IRoomObjectSprite): boolean
    {
        if(!sprite) return false;

        if(this._asset)
        {
            sprite.texture = this._asset;
        }

        let alpha = sprite.alpha;
        let didAnimate = false;

        if(this._numberValueMoving)
        {
            this._numberValueMoveCounter++;

            if(this._numberValueMoveCounter < 10) return false;

            if(this._numberValueFadeDirection < 0)
            {
                if(this._scale < 48)
                {
                    sprite.offsetY -= 2;
                }
                else
                {
                    sprite.offsetY -= 4;
                }
            }
            else
            {
                let count = 4;

                if(this._scale < 48) count = 8;

                if(!(this._numberValueMoveCounter % count))
                {
                    sprite.offsetY--;

                    didAnimate = true;
                }
            }
        }

        if(this._numberValueFadeDirection > 0)
        {
            if(alpha < 255) alpha += 32;

            if(alpha >= 255)
            {
                alpha = 255;

                this._numberValueFadeDirection = 0;
            }

            sprite.alpha = alpha;

            return true;
        }

        if(this._numberValueFadeDirection < 0)
        {
            if(alpha >= 0) alpha -= 32;

            if(alpha <= 0)
            {
                this._numberValueFadeDirection = 0;
                this._numberValueMoving = false;

                alpha = 0;

                sprite.visible = false;
            }

            sprite.alpha = alpha;

            return true;
        }

        return didAnimate;
    }

    public get id(): number
    {
        return this._id;
    }
}
