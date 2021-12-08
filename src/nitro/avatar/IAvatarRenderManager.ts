import { IAssetManager } from '../../core/asset/IAssetManager';
import { INitroManager } from '../../core/common/INitroManager';
import { IGraphicAsset } from '../../room/object/visualization/utils/IGraphicAsset';
import { AvatarAssetDownloadManager } from './AvatarAssetDownloadManager';
import { AvatarStructure } from './AvatarStructure';
import { IAvatarEffectListener } from './IAvatarEffectListener';
import { IAvatarFigureContainer } from './IAvatarFigureContainer';
import { IAvatarImage } from './IAvatarImage';
import { IAvatarImageListener } from './IAvatarImageListener';
import { IStructureData } from './structure/IStructureData';

export interface IAvatarRenderManager extends INitroManager
{
    createFigureContainer(figure: string): IAvatarFigureContainer;
    isFigureContainerReady(container: IAvatarFigureContainer): boolean;
    createAvatarImage(figure: string, size: string, gender: string, listener?: IAvatarImageListener, effectListener?: IAvatarEffectListener): IAvatarImage;
    downloadAvatarFigure(container: IAvatarFigureContainer, listener: IAvatarImageListener): void;
    getFigureClubLevel(container: IAvatarFigureContainer, gender: string, searchParts?: string[]): number;
    isValidFigureSetForGender(setId: number, gender: string): boolean;
    getFigureStringWithFigureIds(k: string, _arg_2: string, _arg_3: number[]): string;
    getMandatoryAvatarPartSetIds(k: string, _arg_2: number): string[];
    getAssetByName(name: string): IGraphicAsset;
    assets: IAssetManager;
    isReady: boolean;
    structure: AvatarStructure;
    structureData: IStructureData;
    downloadManager: AvatarAssetDownloadManager;
}
