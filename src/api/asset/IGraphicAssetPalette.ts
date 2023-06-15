import { Resource, Texture } from '@pixi/core'

export interface IGraphicAssetPalette {
  dispose: () => void;
  primaryColor: number;
  secondaryColor: number;

  applyPalette(texture: Texture<Resource>): Texture<Resource>;
}
