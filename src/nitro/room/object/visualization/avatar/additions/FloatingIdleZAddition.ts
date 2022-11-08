import { Resource, Texture } from '@pixi/core';
import { AvatarAction, IRoomObjectSprite } from '../../../../../../api';
import { GetTickerTime } from '../../../../../../pixi-proxy';
import { AvatarVisualization } from '../AvatarVisualization';
import { IAvatarAddition } from './IAvatarAddition';

export class FloatingIdleZAddition implements IAvatarAddition
{
    private static DELAY_BEFORE_ANIMATION: number = 2000;
    private static DELAY_PER_FRAME: number = 2000;
    private static STATE_DELAY: number = 0;
    private static STATE_FRAME_A: number = 1;
    private static STATE_FRAME_B: number = 2;

    private _id: number;
    private _visualization: AvatarVisualization;
    private _asset: Texture<Resource>;
    private _startTime: number;
    private _offsetY: number;
    private _scale: number;
    private _state: number;

    constructor(id: number, visualization: AvatarVisualization)
    {
        this._id = id;
        this._visualization = visualization;
        this._asset = null;
        this._startTime = GetTickerTime();
        this._offsetY = 0;
        this._scale = 0;
        this._state = 0;
    }

    public dispose(): void
    {
        this._visualization = null;
        this._asset = null;
    }

    private getSpriteAssetName(state: number): string
    {
        let side = 'left';

        if((this._visualization.angle === 135) || (this._visualization.angle === 180) || (this._visualization.angle === 225) || (this._visualization.angle === 270)) side = 'right';

        return ('avatar_addition_user_idle_' + side + '_' + state + ((this._scale < 48) ? '_small' : ''));
    }

    public update(sprite: IRoomObjectSprite, scale: number): void
    {
        if(!sprite) return;

        this._scale = scale;
        this._asset = this._visualization.getAvatarRenderAsset(this.getSpriteAssetName((this._state === FloatingIdleZAddition.STATE_FRAME_A) ? 1 : 2));

        let additionScale = 64;
        let offsetX = 0;

        if(scale < 48)
        {
            if((this._visualization.angle === 135) || (this._visualization.angle === 180) || (this._visualization.angle === 225) || (this._visualization.angle === 270))
            {
                offsetX = 10;
            }
            else
            {
                offsetX = -16;
            }

            this._offsetY = -38;

            additionScale = 32;
        }
        else
        {
            if((this._visualization.angle === 135) || (this._visualization.angle === 180) || (this._visualization.angle === 225) || (this._visualization.angle === 270))
            {
                offsetX = 22;
            }
            else
            {
                offsetX = -30;
            }

            this._offsetY = -70;
        }

        if(this._visualization.posture === AvatarAction.POSTURE_SIT)
        {
            this._offsetY += (additionScale / 2);
        }

        else if(this._visualization.posture === AvatarAction.POSTURE_LAY)
        {
            this._offsetY += (additionScale - (0.3 * additionScale));
        }

        if(this._asset)
        {
            sprite.texture = this._asset;
            sprite.offsetX = offsetX;
            sprite.offsetY = this._offsetY;
            sprite.relativeDepth = -0.02;
            sprite.alpha = 0;
        }
    }

    public animate(sprite: IRoomObjectSprite): boolean
    {
        if(!sprite) return false;

        const totalTimeRunning = GetTickerTime();

        if(this._state === FloatingIdleZAddition.STATE_DELAY)
        {
            if((totalTimeRunning - this._startTime) >= FloatingIdleZAddition.DELAY_BEFORE_ANIMATION)
            {
                this._state = FloatingIdleZAddition.STATE_FRAME_A;
                this._startTime = totalTimeRunning;
                this._asset = this._visualization.getAvatarRenderAsset(this.getSpriteAssetName(1));
            }
        }

        if(this._state === FloatingIdleZAddition.STATE_FRAME_A)
        {
            if((totalTimeRunning - this._startTime) >= FloatingIdleZAddition.DELAY_PER_FRAME)
            {
                this._state = FloatingIdleZAddition.STATE_FRAME_B;
                this._startTime = totalTimeRunning;
                this._asset = this._visualization.getAvatarRenderAsset(this.getSpriteAssetName(2));
            }
        }

        if(this._state === FloatingIdleZAddition.STATE_FRAME_B)
        {
            if((totalTimeRunning - this._startTime) >= FloatingIdleZAddition.DELAY_PER_FRAME)
            {
                this._state = FloatingIdleZAddition.STATE_FRAME_A;
                this._startTime = totalTimeRunning;
                this._asset = this._visualization.getAvatarRenderAsset(this.getSpriteAssetName(1));
            }
        }

        if(this._asset)
        {
            sprite.texture = this._asset;
            sprite.alpha = 255;
            sprite.visible = true;
        }
        else
        {
            sprite.visible = false;
        }

        return false;
    }

    public get id(): number
    {
        return this._id;
    }
}
