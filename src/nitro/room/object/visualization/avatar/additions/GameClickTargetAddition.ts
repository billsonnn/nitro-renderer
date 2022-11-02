import { Resource, Texture } from '@pixi/core';
import { Sprite } from '@pixi/sprite';
import { AlphaTolerance, IRoomObjectSprite } from '../../../../../../api';
import { TextureUtils } from '../../../../../../pixi-proxy';
import { IAvatarAddition } from './IAvatarAddition';

export class GameClickTargetAddition implements IAvatarAddition
{
    private static WIDTH: number = 46;
    private static HEIGHT: number = 60;
    private static OFFSET_X: number = -23;
    private static OFFSET_Y: number = -48;

    private _id: number;
    private _asset: Texture<Resource>;
    private _disposed: boolean;

    constructor(id: number)
    {
        this._id = id;
        this._asset = null;
        this._disposed = false;
    }

    public dispose(): void
    {
        this._asset = null;
    }

    public update(sprite: IRoomObjectSprite, scale: number): void
    {
        if(!sprite) return;

        if(!this._asset)
        {
            const newSprite = new Sprite(Texture.WHITE);

            newSprite.alpha = 0;
            newSprite.width = GameClickTargetAddition.WIDTH;
            newSprite.height = GameClickTargetAddition.HEIGHT;

            this._asset = TextureUtils.generateTexture(newSprite);
        }

        sprite.visible = true;
        sprite.texture = this._asset;
        sprite.offsetX = GameClickTargetAddition.OFFSET_X;
        sprite.offsetY = GameClickTargetAddition.OFFSET_Y;
        sprite.alphaTolerance = AlphaTolerance.MATCH_ALL_PIXELS;
    }

    public animate(sprite: IRoomObjectSprite): boolean
    {
        return false;
    }

    public get id(): number
    {
        return this._id;
    }
}
