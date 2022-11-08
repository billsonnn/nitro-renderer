import { Resource, Texture } from '@pixi/core';
import { AvatarAction, IRoomObjectSprite } from '../../../../../../api';
import { GetTickerTime } from '../../../../../../pixi-proxy';
import { AvatarVisualization } from '../AvatarVisualization';
import { ExpressionAddition } from './ExpressionAddition';

export class FloatingHeartAddition extends ExpressionAddition
{
    private static DELAY_BEFORE_ANIMATION: number = 300;
    private static STATE_DELAY: number = 0;
    private static STATE_FADE_IN: number = 1;
    private static STATE_FLOAT: number = 2;
    private static STATE_COMPLETE: number = 3;

    private _asset: Texture<Resource>;
    private _startTime: number;
    private _delta: number;
    private _offsetY: number;
    private _scale: number;
    private _state: number;

    constructor(id: number, type: number, visualization: AvatarVisualization)
    {
        super(id, type, visualization);

        this._asset = null;
        this._startTime = GetTickerTime();
        this._delta = 0;
        this._offsetY = 0;
        this._scale = 0;
        this._state = 0;
    }

    public update(sprite: IRoomObjectSprite, scale: number): void
    {
        if(!sprite) return;

        this._scale = scale;

        let additionScale = 64;
        let offsetX = 0;

        if(scale < 48)
        {
            this._asset = this.visualization.getAvatarRenderAsset('avatar_addition_user_blowkiss_small');

            if((this.visualization.angle === 90) || (this.visualization.angle === 270))
            {
                offsetX = 0;
            }

            else if((this.visualization.angle === 135) || (this.visualization.angle === 180) || (this.visualization.angle === 225))
            {
                offsetX = 6;
            }

            else offsetX = -6;

            this._offsetY = -38;

            additionScale = 32;
        }
        else
        {
            this._asset = this.visualization.getAvatarRenderAsset('avatar_addition_user_blowkiss');

            if((this.visualization.angle === 90) || (this.visualization.angle === 270))
            {
                offsetX = -3;
            }

            else if((this.visualization.angle === 135) || (this.visualization.angle === 180) || (this.visualization.angle === 225))
            {
                offsetX = 22;
            }

            else offsetX = -30;

            this._offsetY = -70;
        }

        if(this.visualization.posture === AvatarAction.POSTURE_SIT)
        {
            this._offsetY += (additionScale / 2);
        }

        else if(this.visualization.posture === AvatarAction.POSTURE_LAY)
        {
            this._offsetY += additionScale;
        }

        if(this._asset)
        {
            sprite.texture = this._asset;
            sprite.offsetX = offsetX;
            sprite.offsetY = this._offsetY;
            sprite.relativeDepth = -0.02;
            sprite.alpha = 0;

            const delta = this._delta;

            this.animate(sprite);

            this._delta = delta;
        }
    }

    public animate(sprite: IRoomObjectSprite): boolean
    {
        if(!sprite) return false;

        if(this._asset) sprite.texture = this._asset;

        if(this._state === FloatingHeartAddition.STATE_DELAY)
        {
            if((GetTickerTime() - this._startTime) < FloatingHeartAddition.DELAY_BEFORE_ANIMATION) return false;

            this._state = FloatingHeartAddition.STATE_FADE_IN;

            sprite.alpha = 0;
            sprite.visible = true;

            this._delta = 0;

            return true;
        }

        if(this._state === FloatingHeartAddition.STATE_FADE_IN)
        {
            this._delta += 0.1;

            sprite.offsetY = this._offsetY;
            sprite.alpha = (Math.pow(this._delta, 0.9) * 255);

            if(this._delta >= 1)
            {
                sprite.alpha = 255;

                this._delta = 0;
                this._state = FloatingHeartAddition.STATE_FLOAT;
            }

            return true;
        }

        if(this._state === FloatingHeartAddition.STATE_FLOAT)
        {
            const alpha = Math.pow(this._delta, 0.9);

            this._delta += 0.05;

            const offset = ((this._scale < 48) ? -30 : -40);

            sprite.offsetY = (this._offsetY + (((this._delta < 1) ? alpha : 1) * offset));
            sprite.alpha = ((1 - alpha) * 255);

            if(sprite.alpha <= 0)
            {
                sprite.visible = false;

                this._state = FloatingHeartAddition.STATE_COMPLETE;
            }

            return true;
        }

        return false;
    }
}
