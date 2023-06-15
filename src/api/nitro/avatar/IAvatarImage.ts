import { RenderTexture } from '@pixi/core'
import { Sprite } from '@pixi/sprite'
import {
  IAnimationLayerData,
  IAvatarDataContainer,
  IAvatarFigureContainer,
  IDisposable,
  IGraphicAsset,
  IPartColor,
  ISpriteDataContainer
} from '@/api'

export interface IAvatarImage extends IDisposable {
  avatarSpriteData: IAvatarDataContainer;
  animationHasResetOnToggle: boolean;
  mainAction: string;

  getServerRenderData(): any;

  setDirection(_arg_1: string, _arg_2: number): void;

  setDirectionAngle(_arg_1: string, _arg_2: number): void;

  updateAnimationByFrames(_arg_1?: number): void;

  getScale(): string;

  getSprites(): ISpriteDataContainer[];

  getLayerData(_arg_1: ISpriteDataContainer): IAnimationLayerData;

  getImage(setType: string, hightlight: boolean, scale?: number, cache?: boolean): RenderTexture;

  getImageAsSprite(setType: string, scale?: number): Sprite;

  getCroppedImage(setType: string, scale?: number): HTMLImageElement;

  getAsset(_arg_1: string): IGraphicAsset;

  getDirection(): number;

  getFigure(): IAvatarFigureContainer;

  getPartColor(_arg_1: string): IPartColor;

  isAnimating(): boolean;

  getCanvasOffsets(): number[];

  initActionAppends(): void;

  endActionAppends(): void;

  appendAction(_arg_1: string, ..._args: any[]): boolean;

  isPlaceholder(): boolean;

  forceActionUpdate(): void;

  resetAnimationFrameCounter(): void;
}
