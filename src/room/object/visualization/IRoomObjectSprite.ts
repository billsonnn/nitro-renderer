import { Container, Filter, Texture } from 'pixi.js';

export interface IRoomObjectSprite
{
    id: number;
    name: string;
    type: string;
    spriteType: number;
    texture: Texture;
    container: Container;
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    flipH: boolean;
    flipV: boolean;
    direction: number;
    alpha: number;
    blendMode: number;
    color: number;
    relativeDepth: number;
    _Str_4593: boolean;
    _Str_3582: string;
    clickHandling: boolean;
    visible: boolean;
    tag: string;
    posture: string;
    alphaTolerance: number;
    filters: Filter[];
    updateCounter: number;
    updateContainer: boolean;
}