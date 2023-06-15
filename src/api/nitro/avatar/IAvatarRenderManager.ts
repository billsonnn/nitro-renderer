import { AvatarAssetDownloadManager, AvatarStructure } from '@/nitro'
import {
  IAssetManager,
  IAvatarEffectListener,
  IAvatarFigureContainer,
  IAvatarImage,
  IAvatarImageListener,
  IGraphicAsset,
  INitroManager,
  IStructureData
} from '@/api'

export interface IAvatarRenderManager extends INitroManager {
  assets: IAssetManager;
  isReady: boolean;
  structure: AvatarStructure;
  structureData: IStructureData;
  downloadManager: AvatarAssetDownloadManager;

  createFigureContainer(figure: string): IAvatarFigureContainer;

  isFigureContainerReady(container: IAvatarFigureContainer): boolean;

  createAvatarImage(figure: string, size: string, gender: string, listener?: IAvatarImageListener, effectListener?: IAvatarEffectListener): IAvatarImage;

  downloadAvatarFigure(container: IAvatarFigureContainer, listener: IAvatarImageListener): void;

  getFigureClubLevel(container: IAvatarFigureContainer, gender: string, searchParts?: string[]): number;

  isValidFigureSetForGender(setId: number, gender: string): boolean;

  getFigureStringWithFigureIds(k: string, _arg_2: string, _arg_3: number[]): string;

  getMandatoryAvatarPartSetIds(k: string, _arg_2: number): string[];

  getAssetByName(name: string): IGraphicAsset;
}
