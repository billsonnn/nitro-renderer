import { RenderTexture } from '@pixi/core';
import { Sprite } from '@pixi/sprite';
import { IGraphicAsset } from '../../asset';
import { IDisposable } from '../../common';
import { IAnimationLayerData, IAvatarDataContainer, ISpriteDataContainer } from './animation';
import { IAvatarFigureContainer } from './IAvatarFigureContainer';
import { IPartColor } from './structure';

export interface IAvatarImage extends IDisposable
{
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
    avatarSpriteData: IAvatarDataContainer;
    isPlaceholder(): boolean;
    forceActionUpdate(): void;
    animationHasResetOnToggle: boolean;
    resetAnimationFrameCounter(): void;
    mainAction: string;
}
