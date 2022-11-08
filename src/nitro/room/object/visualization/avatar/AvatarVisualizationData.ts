import { Resource, Texture } from '@pixi/core';
import { AvatarScaleType, IAssetData, IAvatarEffectListener, IAvatarImage, IAvatarImageListener, IAvatarRenderManager, IObjectVisualizationData } from '../../../../../api';
import { Disposable } from '../../../../../core';

export class AvatarVisualizationData extends Disposable implements IObjectVisualizationData
{
    private _avatarRenderer: IAvatarRenderManager;

    constructor()
    {
        super();
    }

    public initialize(asset: IAssetData): boolean
    {
        return true;
    }

    public onDispose(): void
    {
        this._avatarRenderer = null;
    }

    public createAvatarImage(figure: string, size: number, gender: string = null, avatarListener: IAvatarImageListener = null, effectListener: IAvatarEffectListener = null): IAvatarImage
    {
        let avatarImage: IAvatarImage = null;

        if(size > 48) avatarImage = this._avatarRenderer.createAvatarImage(figure, AvatarScaleType.LARGE, gender, avatarListener, effectListener);
        else avatarImage = this._avatarRenderer.createAvatarImage(figure, AvatarScaleType.SMALL, gender, avatarListener, effectListener);

        return avatarImage;
    }

    public getAvatarRendererAsset(name: string): Texture<Resource>
    {
        if(!this._avatarRenderer) return null;

        return this._avatarRenderer.assets.getTexture(name);
    }

    public get avatarManager(): IAvatarRenderManager
    {
        return this._avatarRenderer;
    }

    public set avatarManager(renderer: IAvatarRenderManager)
    {
        this._avatarRenderer = renderer;
    }

    public get layerCount(): number
    {
        return 0;
    }
}
