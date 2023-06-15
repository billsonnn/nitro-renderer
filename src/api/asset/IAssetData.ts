import {
  IAsset,
  IAssetAlias,
  IAssetAnimation,
  IAssetLogicData,
  IAssetPalette,
  IAssetRoomVisualizationData,
  IAssetVisualizationData,
  ISpritesheetData
} from '@/api'

export interface IAssetData {
  type?: string;
  name?: string;
  visualizationType?: string;
  logicType?: string;
  spritesheet?: ISpritesheetData;
  logic?: IAssetLogicData;
  assets?: { [index: string]: IAsset };
  aliases?: { [index: string]: IAssetAlias };
  animations?: { [index: string]: IAssetAnimation };
  palettes?: { [index: string]: IAssetPalette };
  visualizations?: IAssetVisualizationData[];
  roomVisualization?: IAssetRoomVisualizationData;
}
