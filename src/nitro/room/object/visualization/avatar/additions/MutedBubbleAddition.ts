import { Resource, Texture } from '@pixi/core';
import { AvatarAction, IRoomObjectSprite } from '../../../../../../api';
import { AvatarVisualization } from '../AvatarVisualization';
import { IAvatarAddition } from './IAvatarAddition';

export class MutedBubbleAddition implements IAvatarAddition
{
    private _id: number;
    private _visualization: AvatarVisualization;
    private _asset: Texture<Resource>;

    constructor(id: number, visualization: AvatarVisualization)
    {
        this._id = id;
        this._visualization = visualization;
        this._asset = null;
    }

    public dispose(): void
    {
        this._visualization = null;
        this._asset = null;
    }

    public update(sprite: IRoomObjectSprite, scale: number): void
    {
        if(!sprite) return;

        let additionScale = 64;
        let offsetX = 0;
        let offsetY = 0;

        if(scale < 48)
        {
            this._asset = this._visualization.getAvatarRenderAsset('avatar_addition_user_muted_small');

            additionScale = 32;
            offsetX = -12;
            offsetY = -66;
        }
        else
        {
            this._asset = this._visualization.getAvatarRenderAsset('avatar_addition_user_muted');

            offsetX = -15;
            offsetY = -110;
        }

        if(this._visualization.posture === AvatarAction.POSTURE_SIT) offsetY += (additionScale / 2);
        else if(this._visualization.posture === AvatarAction.POSTURE_LAY) offsetY += scale;

        if(this._asset)
        {
            sprite.visible = true;
            sprite.texture = this._asset;
            sprite.offsetX = offsetX;
            sprite.offsetY = offsetY;
            sprite.relativeDepth = -0.02;
        }
        else
        {
            sprite.visible = false;
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
}
