import { RenderTexture } from '@pixi/core';
import { DisplayObject } from '@pixi/display';
import { Point } from '@pixi/math';
import { IRoomGeometry } from '../IRoomGeometry';
import { ISortableSprite } from '../object';
import { RoomObjectSpriteData } from '../RoomObjectSpriteData';
import { IRoomCanvasMouseListener } from './IRoomCanvasMouseListener';

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
    getPlaneSortableSprites(): ISortableSprite[];
    handleMouseEvent(x: number, y: number, type: string, altKey: boolean, ctrlKey: boolean, shiftKey: boolean, buttonDown: boolean): boolean;
    getSortableSpriteList(): RoomObjectSpriteData[];
    getDisplayAsTexture(): RenderTexture;
    moveLeft(): void;
    moveRight(): void;
    moveUp(): void;
    moveDown(): void;
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
