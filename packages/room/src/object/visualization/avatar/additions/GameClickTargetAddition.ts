import { AlphaTolerance, IRoomObjectSprite } from '@nitrots/api';
import { TextureUtils } from '@nitrots/utils';
import { Texture } from 'pixi.js';
import { IAvatarAddition } from './IAvatarAddition';

export class GameClickTargetAddition implements IAvatarAddition
{
    private static WIDTH: number = 46;
    private static HEIGHT: number = 60;
    private static OFFSET_X: number = -23;
    private static OFFSET_Y: number = -48;

    private _asset: Texture = null;

    constructor(
        private _id: number)
    {}

    public dispose(): void
    {
        this._asset = null;
    }

    // TODO: needs testing
    public update(sprite: IRoomObjectSprite, scale: number): void
    {
        if(!sprite) return;

        if(!this._asset) this._asset = TextureUtils.createRenderTexture(GameClickTargetAddition.WIDTH, GameClickTargetAddition.HEIGHT);

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
