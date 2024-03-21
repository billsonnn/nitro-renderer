import { Container, Point, Texture } from 'pixi.js';
import { IRoomGeometry } from '../IRoomGeometry';
import { RoomObjectSpriteData } from '../RoomObjectSpriteData';
import { ISortableSprite } from '../object';
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
    getDisplayAsTexture(): Texture;
    moveLeft(): void;
    moveRight(): void;
    moveUp(): void;
    moveDown(): void;
    id: number;
    geometry: IRoomGeometry;
    master: Container;
    display: Container;
    screenOffsetX: number;
    screenOffsetY: number;
    scale: number;
    width: number;
    height: number;
    canvasUpdated: boolean;
}
