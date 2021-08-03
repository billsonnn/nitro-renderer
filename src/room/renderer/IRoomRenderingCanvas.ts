import { RenderTexture } from '@pixi/core';
import { DisplayObject } from '@pixi/display';
import { Point } from '@pixi/math';
import { RoomObjectSpriteData } from '../data/RoomObjectSpriteData';
import { IRoomGeometry } from '../utils/IRoomGeometry';
import { IRoomCanvasMouseListener } from './IRoomCanvasMouseListener';
import { SortableSprite } from './utils/SortableSprite';

export interface IRoomRenderingCanvas
{
    dispose(): void;
    initialize(width: number, height: number): void;
    setMask(flag: boolean): void;
    setScale(scale: number, point?: Point, offsetPoint?: Point, override?: boolean, asDelta?: boolean): void;
    render(time: number, update?: boolean): void;
    update(): void;
    setMouseListener(listener: IRoomCanvasMouseListener): void;
    skipSpriteVisibilityChecking(): void;
    resumeSpriteVisibilityChecking(): void;
    getPlaneSortableSprites(): SortableSprite[];
    handleMouseEvent(k: number, _arg_2: number, _arg_3: string, _arg_4: boolean, _arg_5: boolean, _arg_6: boolean, _arg_7: boolean): boolean;
    getSortableSpriteList(): RoomObjectSpriteData[];
    getDisplayAsTexture(): RenderTexture;
    id: number;
    geometry: IRoomGeometry;
    master: DisplayObject;
    display: DisplayObject;
    screenOffsetX: number;
    screenOffsetY: number;
    scale: number;
    width: number;
    height: number;
    restrictsScaling: boolean;
    canvasUpdated: boolean;
}
