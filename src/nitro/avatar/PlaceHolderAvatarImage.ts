import { AssetAliasCollection } from './alias';
import { AvatarFigureContainer } from './AvatarFigureContainer';
import { AvatarImage } from './AvatarImage';
import { AvatarStructure } from './AvatarStructure';
import { EffectAssetDownloadManager } from './EffectAssetDownloadManager';

export class PlaceHolderAvatarImage extends AvatarImage
{
    constructor(k: AvatarStructure, _arg_2: AssetAliasCollection, _arg_3: AvatarFigureContainer, _arg_4: string, _arg_5: EffectAssetDownloadManager)
    {
        super(k, _arg_2, _arg_3, _arg_4, _arg_5, null);
    }

    public isPlaceholder(): boolean
    {
        return true;
    }
}
