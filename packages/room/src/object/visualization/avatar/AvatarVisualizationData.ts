import { AvatarScaleType, IAssetData, IAvatarEffectListener, IAvatarImage, IAvatarImageListener, IAvatarRenderManager, IObjectVisualizationData } from '@nitrots/api';
import { GetAvatarRenderManager } from '@nitrots/avatar';

export class AvatarVisualizationData implements IObjectVisualizationData
{
    private _avatarRenderer: IAvatarRenderManager;

    public initialize(asset: IAssetData): boolean
    {
        this._avatarRenderer = GetAvatarRenderManager();

        return true;
    }

    public dispose(): void
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

    public get avatarManager(): IAvatarRenderManager
    {
        return this._avatarRenderer;
    }

    public get layerCount(): number
    {
        return 0;
    }
}
