import { Resource, Texture } from '@pixi/core';
import { AvatarAction, IRoomObjectSprite } from '../../../../../../api';
import { AvatarVisualization } from '../AvatarVisualization';
import { IAvatarAddition } from './IAvatarAddition';

export class TypingBubbleAddition implements IAvatarAddition
{
    private _id: number;
    private _visualization: AvatarVisualization;
    private _asset: Texture<Resource>;
    private _relativeDepth: number;

    constructor(id: number, visualization: AvatarVisualization)
    {
        this._id = id;
        this._visualization = visualization;
        this._asset = null;
        this._relativeDepth = 0;
    }

    public dispose(): void
    {
        this._visualization = null;
        this._asset = null;
    }

    public update(sprite: IRoomObjectSprite, scale: number): void
    {
        if(!sprite) return;

        sprite.visible = true;
        sprite.relativeDepth = this._relativeDepth;
        sprite.alpha = 255;

        let additionScale = 64;
        let offsetX = 0;
        let offsetY = 0;

        if(scale < 48)
        {
            this._asset = this._visualization.getAvatarRenderAsset('avatar_addition_user_typing_small');

            offsetX = 3;
            offsetY = -42;

            additionScale = 32;
        }
        else
        {
            this._asset = this._visualization.getAvatarRenderAsset('avatar_addition_user_typing');

            offsetX = 14;
            offsetY = -83;
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
            sprite.texture = this._asset;
            sprite.offsetX = offsetX;
            sprite.offsetY = offsetY;
            sprite.relativeDepth = (-0.02 + 0);
        }
    }

    public animate(sprite: IRoomObjectSprite): boolean
    {
        if(this._asset && sprite)
        {
            sprite.texture = this._asset;
        }

        return false;
    }

    public get id(): number
    {
        return this._id;
    }

    public get relativeDepth(): number
    {
        return this._relativeDepth;
    }

    public set relativeDepth(depth: number)
    {
        this._relativeDepth = depth;
    }
}
