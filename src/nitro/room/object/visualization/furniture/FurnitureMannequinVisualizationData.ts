import { IAvatarEffectListener } from '../../../../avatar/IAvatarEffectListener';
import { IAvatarImage } from '../../../../avatar/IAvatarImage';
import { IAvatarImageListener } from '../../../../avatar/IAvatarImageListener';
import { IAvatarRenderManager } from '../../../../avatar/IAvatarRenderManager';
import { AvatarVisualizationData } from '../avatar/AvatarVisualizationData';
import { FurnitureVisualizationData } from './FurnitureVisualizationData';

export class FurnitureMannequinVisualizationData extends FurnitureVisualizationData
{
    private _avatarData: AvatarVisualizationData;

    constructor()
    {
        super();

        this._avatarData = new AvatarVisualizationData();
    }

    public dispose(): void
    {
        super.dispose();

        if(this._avatarData)
        {
            this._avatarData.dispose();

            this._avatarData = null;
        }
    }

    public createAvatarImage(figure: string, size: number, gender: string = null, avatarListener: IAvatarImageListener = null, effectListener: IAvatarEffectListener = null): IAvatarImage
    {
        return this._avatarData.createAvatarImage(figure,size, gender, avatarListener, effectListener);
    }

    public set avatarManager(renderer: IAvatarRenderManager)
    {
        this._avatarData.avatarManager = renderer;
    }
}